import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SubjectService} from '../service-model/subject.service';
import {GetAllGrade} from '../actions/subject-action';
import {GradeModel} from '../model/subject.model';
import {NotiService} from '../service-model/notification.service';

@Injectable()
export class GradeStateModel {
  grades : GradeModel[];
}

@State<GradeStateModel>({
  name: 'grade',
  defaults: {
    grades: []
  }
})

@Injectable()
export class GradeState{
  constructor(private subjectService: SubjectService) {
  }

  @Selector()
  static getAllGrade(state: GradeStateModel): GradeModel[] {
    return state.grades;
  }

  @Action(GetAllGrade)
  getAllGrade({getState, setState} : StateContext<GradeStateModel>) {
    return this.subjectService.getAllGrade().subscribe(result => {
      const state = getState();
      setState({
        ...state,
        grades: result
      })
    })
  }
}
