import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'kt-add-new-violate-rules',
  templateUrl: './add-new-violate-rules.component.html',
  styleUrls: ['./add-new-violate-rules.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewViolateRulesComponent implements OnInit {

  _data: Array<string> = ['Đang hoạt đông', 'Dừng hoạt đông'];
  _valueDefault = 'Tất cả';
  _formAdd: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this._formAdd = fb.group({
      gradeLevel: ['', Validators.required],
      className: ['', Validators.required],
      codeStudent: ['', Validators.required],
      dateOfViolation: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
