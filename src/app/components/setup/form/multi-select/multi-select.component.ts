import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, AfterViewInit {
  @Input() formControl: FormControl;
  @Input() input: any;
  @ViewChild('selectizeInput') selectizeInput;

  private highestLength = 50;
  public selected: Array<String> = [];
  public selections: Array<{ label: string, value: string }> = [];
  public showPossibles = false;

  ngOnInit(): void {
    this.initSelectedValues();
    this.refineSelections();
  }

  ngAfterViewInit() {
    this.selectizeInput.nativeElement.style.width = ((this.selectizeInput.nativeElement.value.length + 1) * 6.8) + 'px';
  }

  initSelectedValues(): void {
    if (!this.formControl.value) {
      return;
    }

    this.formControl.value.toString().split(',').forEach((selected) => {
      this.addSelected(selected);
    });
  }

  addSelected(value: string) {
    this.selected.push(value);
    this.selectizeInput.nativeElement.value = '';
    this.refineSelections();
    this.updateFormControlValue();
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
      this.selectizeInput.nativeElement.value = '';
      this.refineSelections();
    }, 200);
  }

  refineSelections(value: string = ''): void {
    this.selections = [];
    for (const data in this.input.source) {
      if (!this.input.source.hasOwnProperty(data) || this.selected.includes(data)) {
        continue;
      }

      if (value !== '' && data.indexOf(value) === -1) {
        continue;
      }

      this.selections.push({
        label: this.input.source[data],
        value: data,
      });
    }
  }

  removeSelected(value: string): void {
    this.selected.splice(this.selected.indexOf(value), 1);
    this.refineSelections();
    this.updateFormControlValue();
  }

  updateFormControlValue(): void {
    let formControlValue = '';
    this.selected.forEach((data: string) => {
      formControlValue += (formControlValue.length > 0 ? ',' : '') + data;
    });

    this.formControl.setValue(formControlValue);
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
