import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './selectize.component.html',
  styleUrls: ['./selectize.component.scss']
})
export class SelectizeComponent implements OnInit, AfterViewInit {
  @Input() formControl: FormControl;
  @Input() input: any;
  public selections: Array<String> = [];
  public selected: Array<String> = [];
  @ViewChild('selectizeInput') selectizeInput;
  private highestLength = 50;
  constructor() {
  }

  ngOnInit(): void {
    /**
     * TODO : Peut-être limiter le nom de caractères possible dans l'input par rapport a la plus longue valeur du tableur "possibles" ?
     */
    this.resetSelectionsToDefault();
  }

  ngAfterViewInit() {
    this.selectizeInput.nativeElement.style.width = ((this.selectizeInput.nativeElement.value.length + 1) * 6.8) + 'px';
  }

  addSelected(value: string) {
    this.selected.push(value);
  }
  checkInput(event: Event): void {
    const target = <HTMLInputElement>event.target;
    this.resizeInput(target);
    this.refineSelections(target.value);
  }

  refineSelections(value: string): void {
    this.resetSelectionsToDefault();
    if (value !== '') {
      const possibles: Array<String> = [];
      this.selections.forEach(selection => {
        if (selection.indexOf(value) !== -1) {
          possibles.push(selection);
        }
      });
      this.selections = possibles;
    }
  }

  resetSelectionsToDefault(): void {
    this.selections = [...this.input.possibles];
  }

  resizeInput(target: HTMLInputElement): void {
    if (target.value.length > 11) {
      target.value = target.value.substr(0, this.highestLength);
    }
    if (target.value.length > 0) {
      target.style.width = ((target.value.length + 1) * 6.9) + 'px';
    } else {
      target.style.width = '';
    }
  }
}
