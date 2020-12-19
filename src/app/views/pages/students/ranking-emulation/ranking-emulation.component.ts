import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'kt-ranking-emulation',
  templateUrl: './ranking-emulation.component.html',
  styleUrls: ['./ranking-emulation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankingEmulationComponent implements OnInit {

  
  public maxDate = new Date();
  gridView: GridDataResult;

  isCollapsed: boolean = false;
  public mySelection: string[] = [];
  public skip = 0;
  _pageSize = 10;
  pageSizes: Array<number> = [10, 20, 50, 100];

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

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    //this.getAllRole();
  }

  onChange(row) {
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      //this.disableBtnDele = false;
    } else {
      //this.disableBtnDele = true;
    }
  }

  submit(): void {
    console.log(this._formSearch)
  }

}
