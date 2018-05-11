import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent {

  @Input() input: any;
  data: Array<String>;
  selected: String;
  show: Boolean = false;

  constructor() {
    this.data = [
      '80',
      '8080',
      '5050',
      '6060',
      '9999',
      '666'
    ];
  }

  changeSelected(value: any) {
    this.selected = value;
  }

  showSelect() {
    this.show = true;
  }

  hideSelect() {
    this.show = false;
  }
}
