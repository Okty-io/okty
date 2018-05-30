import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './selectize.component.html',
  styleUrls: ['./selectize.component.scss']
})
export class SelectizeComponent implements OnInit, AfterViewInit {
  @Input() formControl: FormControl;
  @Input() input: any;
  @ViewChild('selectizeInput') selectizeInput;
  private highestLength = 50;
  public selected: Array<String> = [];
  public selections: Array<String> = [];
  public showPossibles = false;

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
    this.selectizeInput.nativeElement.value = '';
    this.resetSelectionsToDefault();
  }
  checkInput(event: Event): void {
    const target = <HTMLInputElement>event.target;
    this.resizeInput(target);
    this.refineSelections(target.value);
  }

  focusTheInput(target: HTMLElement): void {
    if (!target.classList.contains('selectize-selected')) {
      this.selectizeInput.nativeElement.focus();
    }
  }
  hidePossiblesContainer(): void {
    setTimeout(() => {
      this.showPossibles = false;
    }, 100);
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

  removeSelected(value: string): void {
    this.selected.splice(this.selected.indexOf(value), 1);
    this.resetSelectionsToDefault();
  }

  resetSelectionsToDefault(): void {
    const possibles: Array<String> = [];
    this.input.possibles.forEach((possible) => {
      if (this.selected.indexOf(possible) === -1) {
        possibles.push(possible);
      }
    });
    this.selections = [...possibles];
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

  showPossiblesContainer(): void {
    this.showPossibles = true;
  }
}
