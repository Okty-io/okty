import {Component, OnInit} from '@angular/core';
import {Container} from '../../models/container.model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  container: Container;
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    this.container = route.snapshot.data.container;
  }

  ngOnInit(): void {
    this.initFormControls();
    this.projectService.addContainer();
  }

  submit(): void {
    console.log(this.formGroup.value); // TODO
  }

  private initFormControls(): void {
    this.formGroup = new FormGroup({});

    this.container.config.forEach(group => {
      group.fields.forEach(input => {
        const formControl = new FormControl('');
        const controlName = group.label + '_' + input.id;

        this.formGroup.addControl(controlName, formControl);
      });
    });
  }
}
