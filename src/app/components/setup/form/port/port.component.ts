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
    console.log(value);
    this.selected = value;
  }

  showPossibles() {
    console.log('showPossibles');
    this.show = true;
  }

  hidePossibles() {
    console.log('hidePossibles');
    this.show = false;
  }
}
