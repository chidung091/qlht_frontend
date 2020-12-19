import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CommonStore} from '../../../../core/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {SmasContextService} from '../../../../core/_base/layout';
import {Year} from '../../../../core/year';
import {ClassroomSelectorService} from './classroom-selector.service';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'kt-classroom-selector',
  templateUrl: './classroom-selector.component.html',
  styleUrls: ['./classroom-selector.component.scss']
})
export class ClassroomSelectorComponent extends CommonStore implements OnInit {

  @ViewChild(NgbDropdown) dropdown: NgbDropdown;
  @Output() output = new EventEmitter();
  classRoomSelector: string;

  dataTreeView$ = new BehaviorSubject<any>([])
  currentYear: Year;

  constructor(
    public store: Store<AppState>,
    private smasContextService: SmasContextService,
    private classroomSelectorService: ClassroomSelectorService,
  ) {
    super(store)
  }

  ngOnInit(): void {
    this.classRoomSelector = 'Lựa chọn';
    this.grade$.subscribe(value => {
      let temp;
      if (value) {
        temp = value.map(grade => {
          return {
            id: grade.id,
            gradeCode: grade.cateCode,
            gradeName: grade.cateName
          }
        })
        console.log(temp);
        this.dataTreeView$.next(temp)
      }
    })
    this.smasContextService.yearUpdate$.subscribe(value => {
      this.currentYear = value;
    })
  }

  public hasChildren = (item: any) => 'gradeName' in item;

  public fetchChildren = (item: any) => this.classroomSelectorService.getClassByGradeAndYear(item.gradeCode, this.currentYear.id)

  handleSelection(e, dropdown: NgbDropdown){
    if (e.dataItem.gradeName) {
      this.classRoomSelector = e.dataItem.gradeName;
    } else {
      this.classRoomSelector = e.dataItem.className;
      this.closeDropdown(dropdown);
    }
    this.output.emit(e.dataItem);
  }

  closeDropdown(dropdown: NgbDropdown) {
    dropdown.close()
  }
}
