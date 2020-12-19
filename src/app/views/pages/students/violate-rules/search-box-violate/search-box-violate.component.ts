import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'kt-search-box-violate',
  templateUrl: './search-box-violate.component.html',
  styleUrls: ['./search-box-violate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxViolateComponent implements OnInit {

  @Output() submitted = new EventEmitter();
  _isCollapsed = false;
  _formSearch: FormGroup;
  _data: Array<string> = ['Đang hoạt đông','Dừng hoạt đông'];
  _valueDefault = 'Tất cả';

  constructor(private fb: FormBuilder) {
    this._formSearch = fb.group({
      dateOfViolation:fb.group({
        formDateOfViolation: ['', [Validators.required]],
        toDateOfViolation: ['', [Validators.required]],
      }),
      groupOfViolations: [this._valueDefault],
      gradeLevel: [this._valueDefault],
      codeStudents: fb.group({
        formCodeStudent: ['', [Validators.required]],
        toCodeStudent: ['', [Validators.required]]
      }),
      bySemester: ['',Validators.required],
      className: [this._valueDefault]
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this._formSearch)
  }

  setValueSemester(event: any): void{
    this._formSearch.patchValue({
        bySemester: event.target.value
    })
  }

  change(event: any){
    console.log(event)
  }
}
