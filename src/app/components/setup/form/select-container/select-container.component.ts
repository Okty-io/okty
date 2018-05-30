import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { Container } from '../../../../models/container.model';

@Component({
  templateUrl: './select-container.component.html',
  styleUrls: ['./select-container.component.scss']
})
export class SelectContainerComponent implements OnInit {

  @Input() formControl: FormControl;
  @Input() input: any;
  data: string[];
  selected: String;
  show: Boolean = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.data = [];

    this.projectService.getContainers().forEach((container: Container) => {
      this.data.push(container.containerId);
    });
  }

  changeSelected(value: any) {
    this.selected = value;
    this.formControl.setValue(value);
  }

  showSelect() {
    this.show = true;
  }

  hideSelect() {
    this.show = false;
  }
}
