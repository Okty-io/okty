import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() formControl: FormControl;
  @Input() input: any;
  data: Array<{ value: string, label: string }>;
  selected: String;
  show: Boolean = false;

  constructor() {
    this.data = [];
  }

  ngOnInit(): void {
    for (const value in this.input.source) {
      if (!this.input.source.hasOwnProperty(value)) {
        continue;
      }

      this.data.push({value: value, label: this.input.source[value]});
    }
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
