import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formControlName][trimForm]'
})
export class TrimFormDirective {
  constructor(public ngControl: NgControl) {
  }

  @HostListener('blur', ['$event'])
  onBlur (event) {
    const newVal = this.transform(event.target.value);
    this.ngControl.valueAccessor.writeValue(newVal);
  }

  transform(value) {
    return value.trim().replace(/(\s\s+| )/g, ' ');
  }
}
