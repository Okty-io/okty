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
import { ContainerService } from '../../services/container.service';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {

  containerIndex: number;
  container: Container;
  formGroup: FormGroup;

  private dataSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private sidebarService: SidebarService,
              private messageService: MessageService,
              private titleService: CustomTitleService,
              private router: Router,
              private containerValidator: ContainerValidator,
              private containerService: ContainerService,
  ) {
    this.container = this.route.snapshot.data.container;
  }

  ngOnInit(): void {
    this.titleService.setTitle('New container : ' + this.container.name);

    this.dataSubscription = this.route.data.subscribe(data => {
      this.container = data.container;
      this.containerIndex = this.projectService.getIndexOfContainer(data.container);

      this.initFormControls();
    });

    this.initFormControls();
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
        const controlName = group.id + '_' + input.id;

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

    this.container = this.containerService.dataToContainer(this.container, this.formGroup.value);

    if (this.projectService.addContainer(this.container.containerId, this.container)) {
      this.router.navigate(['/review']);
      this.sendNotification();
    }
  }

  removeContainer(containerId: string) {
    this.projectService.removeContainer(containerId);
    this.router.navigate(['/search']);
  }

  goBack(): void {
    this.router.navigate(['/search']);
    return;
  }

  private sendNotification(): void {
    const msg = 'Your container has been added successfully !';
    this.messageService.makeNotification(msg, 'success');
  }

  private setValidatorsToInput(formControl: FormControl, input: any) {
    const validators = [];
    const config = input.validators;
    if (!config) {
      return;
    }

    for (const validator of config) {
      switch (validator.name) {
        case 'required':
          validators.push(Validators.required);
          break;
        case 'numbers':
          validators.push(Validators.min(validator.constraint.min));
          validators.push(Validators.max(validator.constraint.max));
          validators.push(isNumberValidator);
          break;
        case 'regex':
          validators.push(Validators.pattern(validator.constraint));
          break;
      }
    }

    if (input.destination === 'id' && input.base === 'container_id') {
      formControl.setAsyncValidators(this.containerValidator.isIdUnique(this.containerIndex).bind(this.containerValidator));
    }

    formControl.setValidators(validators);
  }
}
