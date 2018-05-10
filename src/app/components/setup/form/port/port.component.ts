import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent {
  @Input() values: Array<String>;
  possibles: Array<String>;
  selected: String;
  show: Boolean = false;
  constructor() {
    this.possibles = [
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

  showPossibles() {
    this.show = true;
  }

  hidePossibles() {
    this.show = false;
  }
}
