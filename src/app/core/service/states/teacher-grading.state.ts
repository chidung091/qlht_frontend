import {Injectable} from "@angular/core";
import {TeacherGrading} from "../model/teacher-grading";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TeacherGradingService} from "../service-model/teacher-grading.service";
import {DeleteTeacherGrading, GetTeacherGradingByPage, SaveTeacherGrading} from "../actions/teacher-grading.action";

@Injectable()
export class TeacherGradingStateModel {
  teacherGradings: TeacherGrading[];
  totalCount: number;
}

@State<TeacherGradingStateModel>({
  name: 'Teacher Grading',
  defaults: {
    teacherGradings: [],
    totalCount: 0
  }
})
export class TeacherGradingState {
  constructor(private teacherGradingService: TeacherGradingService) {
  }

  @Selector()
  static listTeacherGradingByPage(state: TeacherGradingStateModel): TeacherGrading[] {
    return state.teacherGradings;
  }

  @Action(GetTeacherGradingByPage)
  getTeacherGradingBypage(ctx: StateContext<TeacherGradingStateModel>, tg:GetTeacherGradingByPage){
    return this.teacherGradingService.getTeacherGradingByInfor(tg.namHoc,tg.idSchoolFaculty,tg.pageSize,tg.skip).toPromise().then(
      (data)=> {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          teacherGradings: data.items,
          totalCount: data.totalCount
        })
      }
    );
  }

  @Action(SaveTeacherGrading)
  saveTeacherGrading(ctx: StateContext<TeacherGradingStateModel>, tg: SaveTeacherGrading){
    return this.teacherGradingService.editTeacherGradping(tg.teacherGradings).toPromise();
  }
  @Action(DeleteTeacherGrading)
  deleteTeacherGredings(ctx: StateContext<TeacherGradingStateModel>, tg: DeleteTeacherGrading){
  }

}
