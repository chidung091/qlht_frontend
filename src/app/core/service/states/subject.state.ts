import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SubjectService} from '../service-model/subject.service';
import {GetSubjectByClass, SaveSubject} from '../actions/subject-action';
import {GetSubjectModel, SubjectModel} from '../model/subject.model';
import {NotiService} from '../service-model/notification.service';
import {locale} from '../../_config/i18n/vi';

@Injectable()
export class SubjectStateModel {
  subjects : SubjectModel[];
}

@State<SubjectStateModel>({
  name: 'subject',
  defaults: {
    subjects: [],
  }
})

@Injectable()
export class SubjectState{
  constructor(private subjectService: SubjectService, private notiService: NotiService) {
  }

  @Selector()
  static getAllSubject(state: SubjectStateModel): SubjectModel[] {
    return state.subjects;
  }

  // @Action(SaveSubject)
  // saveSubject({getState, setState} : StateContext<SubjectStateModel>,{data, getData}: SaveSubject) {
  //   let checkSotiet = 0;
  //   data.lstMon.forEach(sub => {
  //     if (sub.soTietHk1 < 0 || sub.soTietHk2 < 0 || sub.soTietHk1 > 999 || sub.soTietHk2 > 999) {
  //       checkSotiet += 1;
  //     }
  //   });
  //   if (checkSotiet > 0) this.notiService.showNoti(locale.data.NOTIFICATION.PLEASE_ENTER_VALID_LESSON,'error');
  //   else {
  //     const state = getState();
  //     this.subjectService.saveSubject(data).subscribe(result => {
  //       setState({
  //         ...state,
  //         subjects: result.items
  //       })
  //         if (data.isApDungKhoi === false) this.notiService.updateSuccess();
  //         if (data.isApDungKhoi === true) this.notiService.showNoti(locale.data.NOTIFICATION.UPDATE_ALL_GRADE_SUCCESS, 'success');
  //         checkSotiet = 0;
  //       // return this.subjectService.getSubjectByClass(getData).subscribe(results => {
  //       //   setState({
  //       //     ...state,
  //       //     subjects: results.items
  //       //   })
  //       //   if (data.isApDungKhoi === false) this.notiService.showNoti('Cập nhật thành công', 'success');
  //       //   if (data.isApDungKhoi === true) this.notiService.showNoti('Cập nhật toàn khối thành công', 'success');
  //       //   checkSotiet = 0;
  //       // })
  //     });
  //   }
  // }

  @Action(GetSubjectByClass)
  getSubjectByClass({getState, setState} : StateContext<SubjectStateModel>,{data}: GetSubjectByClass) {
    return this.subjectService.getSubjectByClass(data).subscribe(result => {
      const state = getState();
      setState({
        ...state,
        subjects: result.items
      })
    })
  }
}
