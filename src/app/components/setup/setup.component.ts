import { Component, OnDestroy, OnInit } from '@angular/core';
import { Container } from '../../models/container.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';
import { isNumberValidator } from '../../validators/isNumber';
import { MessageService } from '../../services/message.service';
import { CustomTitleService } from '../../services/title.service';
import { ContainerValidator } from '../../validators/container.validator';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {

  containerId: string;
  container: Container;
  formGroup: FormGroup;
  outputConfig: any;

  private dataSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private sidebarService: SidebarService,
              private messageService: MessageService,
              private titleService: CustomTitleService,
              private router: Router,
              private containerValidator: ContainerValidator
  ) {
    this.container = this.route.snapshot.data.container;
  }

  ngOnInit(): void {
    this.titleService.setTitle('New container : ' + this.container.name);

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

        this.setValidatorsToInput(formControl, input);

        this.formGroup.addControl(controlName, formControl);
      });
    });
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.messageService.makeNotification('There are some errors with the data you provided', 'danger');
      return;
    }

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
      });
    });

    this.container.output = this.outputConfig;

    if (this.projectService.addContainer(this.containerId, this.container)) {
      this.router.navigate(['/review']);
      this.sendNotification();
    }
  }

  goBack(): void {
    this.router.navigate(['/search']);
    return;
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

  private sendNotification(): void {
    const msg = 'Your container has been added successfully !';
    this.messageService.makeNotification(msg, 'success');
  }

  private setValidatorsToInput(formControl: FormControl, input: any) {
    const validators = [];
    const config = input.validators;

    for (const key in config) {
      if (!config.hasOwnProperty(key)) {
        continue;
      }

      switch (key) {
        case 'required':
          validators.push(Validators.required);
          break;
        case 'numbers':
          validators.push(Validators.min(config[key].min));
          validators.push(Validators.max(config[key].max));
          validators.push(isNumberValidator);
          break;
        case 'regex':
          validators.push(Validators.pattern(config[key]));
          break;
      }
    }

    if (input.destination === 'id' && input.base === 'container_id') {
      formControl.setAsyncValidators(this.containerValidator.isIdUnique.bind(this.containerValidator));
    }

    formControl.setValidators(validators);
  }
}
