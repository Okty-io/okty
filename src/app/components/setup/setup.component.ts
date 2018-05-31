import { Component, OnDestroy, OnInit } from '@angular/core';
import { Container } from '../../models/container.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '../../services/sidebar.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {

  containerId: string;
  container: Container;
  formGroup: FormGroup;
  outputConfig: any;

  private dataSubscription: ISubscription;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private sidebarService: SidebarService,
              private router: Router
  ) {
    this.container = this.route.snapshot.data.container;
  }

  ngOnInit(): void {
    this.dataSubscription = this.route.data.subscribe(data => {
      this.container = data.container;
      this.initFormControls();
    });

    this.initFormControls();
    this.sidebarService.show();
    this.outputConfig = {};
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  private initFormControls(): void {
    this.formGroup = new FormGroup({});

    this.container.config.forEach(group => {
      group.fields.forEach(input => {
        let value = input.value;
        if (input.data) {
          value = input.data;
        }

        const formControl = new FormControl(value);
        const controlName = group.label + '_' + input.id;

        formControl.setValidators(Validators.required);
        this.formGroup.addControl(controlName, formControl);
      });
    });
  }

  submit(): void {
    this.container.config.forEach((group) => {
      group.fields.forEach((input) => {
        const controlName = group.label + '_' + input.id;
        const value = this.formGroup.get(controlName).value;
        input.data = value;

        switch (input.destination) {
          case 'docker-compose':
            this.addToDockerCompose(value, input);
            break;
          case 'environment':
            this.addToEnvironment(value, input);
            break;
          case 'volumes':
            this.addToVolumes(value, input);
            break;
          case 'ports':
            this.addToPorts(value, input);
            break;
          case 'id':
            this.addToId(value, input);
            break;
        }

        this.outputConfig['image'] = this.container.docker + ':' + this.container.version;
        this.router.navigate(['/review']);
      });
    });

    this.container.output = this.outputConfig;
    this.projectService.addContainer(this.containerId, this.container);
  }

  private addToDockerCompose(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    const notOverridableFolder: Array<string> = ['volumes', 'environment', 'ports'];
    if (notOverridableFolder.includes(input.base)) {
      return;
    }

    this.outputConfig[input.base] = value;
  }

  private addToEnvironment(value: string, input: any): void {
    if (!this.outputConfig['environment']) {
      this.outputConfig['environment'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['environment'].push(input.base + '=' + value);
  }

  private addToVolumes(value: string, input: any): void {
    if (!this.outputConfig['volumes']) {
      this.outputConfig['volumes'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['volumes'].push(value + ':' + input.base);
  }

  private addToPorts(value: string, input: any): void {
    if (!this.outputConfig['ports']) {
      this.outputConfig['ports'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['ports'].push(value + ':' + input.base);
  }

  private addToId(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    this.containerId = value;
  }
}
