import {Injectable} from '@angular/core';
import {ClassroomModel} from '../model/classroom.model';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {ClassroomService} from '../service-model/classroom.service';
import {
  AddClassroom,
  DeleteClassroom,
  GetAllClassroom,
  GetNamHoc, GetLopbyKhoi, GetClassByPage, UpdateClassroom, DeleteClassroomList, GetClassByGradeAndYear, GetClassByYear
} from '../actions/classroom.action';
import {NotiService} from '../service-model/notification.service';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {locale} from '../../_config/i18n/vi';
import {SchoolYear} from '../model/school-year.model';


@Injectable()
export class ClassroomStateModel {
  classrooms: ClassroomModel[];
  classByPage: ClassroomModel[];
  classByYear: ClassroomModel[];
  classByGradeAndYear: ClassroomModel[];
  totalItem: number;
  namHoc: SchoolYear[];
}

@State<ClassroomStateModel>({
  name: 'classroom',
  defaults: {
    classrooms: [],
    classByPage: [],
    classByYear: [],
    classByGradeAndYear: [],
    totalItem: 0,
    namHoc: [],
  }
})
@Injectable()
export class ClassroomState{
  private inforFind: GridParam;
  private updateclassroom: ClassroomModel;

  constructor(private classroomService: ClassroomService,
              private notiService: NotiService) {
  }
  @Selector()
  static getClassProfiles(state: ClassroomStateModel) {
    return state.classByPage;
  }

  @Selector()
  static getTotalItems(state: ClassroomStateModel) {
    return state.totalItem;
  }

  @Selector()
  static getAllClassroom(state: ClassroomStateModel) {
    return state.classrooms;
  }

  @Selector()
  static getNamHoc(state: ClassroomStateModel) {
    return state.namHoc;
  }
  @Selector()
  static getClassByGradeAndYear(state: ClassroomStateModel) {
    return state.classByGradeAndYear;
  }
  @Selector()
  static getClassByYear(state: ClassroomStateModel) {
    return state.classByYear;
  }

  @Action(GetAllClassroom)
  getAllClassroom({getState, setState}: StateContext<ClassroomStateModel>) {
    return this.classroomService.getAllClassroom().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        classrooms: result,
      })
    }))
  }
  @Action(GetNamHoc)
  getNamHoc({getState, setState}: StateContext<ClassroomStateModel>) {
    return this.classroomService.getNamHoc().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        namHoc: result,
      })
    }))
  }
  @Action(AddClassroom)
  async addClassRoom({getState, patchState}: StateContext<ClassroomStateModel>, {payload}: AddClassroom) {
    await this.classroomService.addClassroom(payload).toPromise();
  }

  @Action(DeleteClassroom)
  DeleteClassroom({getState, setState}: StateContext<ClassroomStateModel>, {id}: DeleteClassroom) {
    return this.classroomService.DeleteClassroom(id).pipe(tap((result) => {
      const state = getState();
      const filteredArray = state.classrooms.filter(item => item.id !== id);
      setState({
        ...state,
        classrooms: filteredArray,
      })
      this.notiService.deleteSuccess();
    }))
  }
  @Action(DeleteClassroomList)
  DeleteClassroomList({getState, setState}: StateContext<ClassroomStateModel>, {ids}: DeleteClassroomList) {
    return this.classroomService.DeleteClassroomList(ids).toPromise();
  }
  @Action(UpdateClassroom)
  async UpdateClassroom({getState, setState}: StateContext<ClassroomStateModel>, {id, updateClassroom}: UpdateClassroom) {
    await this.classroomService.updateClassroom(id, updateClassroom).toPromise().then(result=>{
      this.notiService.updateSuccess();
    });
  }

  @Action(GetLopbyKhoi)
  getLopbyKhoi({getState, setState}: StateContext<ClassroomStateModel>, {Keyword}: GetLopbyKhoi) {
    return this.classroomService.getLopbyKhoi(Keyword).toPromise().then(
      (result)=>{
        const state = getState();
        setState({
          ...state,
          classrooms: result
        })
      }
    )
  }

  @Action(GetClassByPage)
  getClassByPage(ctx: StateContext<ClassroomStateModel>, {khoi, lop, nameTeacher, skip, pageSize}: GetClassByPage) {
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationtime';
    this.inforFind.sortDirection = SortDirection.DESC
    this.inforFind.filterItems = [];
    if (khoi !== undefined && khoi !== '') {
      this.inforFind.filterItems.push({
        value: khoi,
        propertyName: 'khoi',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }
    if (lop !== undefined && lop !== '') {
      this.inforFind.filterItems.push({
        value: lop,
        propertyName: 'id',
        comparison: ComparisonOperator.Equal
      } as FilterItems);
    }
    this.inforFind.filterItems.push({
        value: nameTeacher,
        propertyName: 'tenGVCN',
        comparison: ComparisonOperator.Contains
      } as FilterItems
    );
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.classroomService.getClassByPage(this.inforFind).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        classByPage: result.items,
        totalItem: result.totalCount
      })
    });
  }
  @Action(GetClassByGradeAndYear)
  getClassByGardeAndYear({getState, setState}: StateContext<ClassroomStateModel>, {khoi, namHoc}: GetClassByGradeAndYear) {
    return this.classroomService.GetClassByGradeAndYear(khoi,namHoc).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        // classByGradeAndYear: result,
        classrooms: result
      })
    }))
  }
  @Action(GetClassByYear)
  getClassByYear({getState, setState}: StateContext<ClassroomStateModel>, {namHoc}: GetClassByYear) {
    return this.classroomService.GetClassByYear(namHoc).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        classByYear: result,
      })
    }))
  }
}
