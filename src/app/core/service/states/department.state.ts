import {Department} from '../model/department.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

import {NotiService} from '../service-model/notification.service';
import {
  AddDepartment,
  DeleteDepartment, DeleteListDepartment,
  GetDepartment,
  ListDepartment,
  UpdateDepartment
} from '../actions/department.action';
import {SchoolFacultyService} from '../service-model/school-faculty.service';
import {SchoolFacultyModule} from '../../../views/pages/system/school-faculty/school-faculty.module';
import {error, newArray} from '@angular/compiler/src/util';
import {mergeMap} from 'rxjs/operators';
import {locale} from '../../_config/i18n/vi';

export interface DepartmentModel {
  departments: Department[];
  department$: Department[];
  total: number;
}


@State<DepartmentModel>({
  name: 'department',
  defaults: {
    department$: undefined,
    departments: [],
    total: 0
  }
})
@Injectable()
export class DepartmentState {
  constructor(private departmentService: SchoolFacultyService, private notiService: NotiService) {
  }

  @Selector()
  static depar(state: DepartmentModel): Department[] {
    return state.departments;
  }

  @Selector()
  static getTotal(state: DepartmentModel): number {
    return state.total;
  }
  @Selector()
  static listDepartment(state: DepartmentModel): Department[] {
    return state.department$;
  }

  @Action(ListDepartment)
  listDepartment(ctx: StateContext<DepartmentModel>, action: ListDepartment) {
    return this.departmentService.getAllDepartMent().subscribe(data => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        department$: data.items
      });
    });
  }

  @Action(AddDepartment)
  async addDepartment(ctx: StateContext<DepartmentModel>, {department}: AddDepartment) {
    await this.departmentService.addDepartment(department).toPromise();
  }

  @Action(UpdateDepartment)
  async updateDepartment(ctx: StateContext<DepartmentModel>, {department}: UpdateDepartment) {
    await this.departmentService.updateDepartment(department).toPromise();
    //   .subscribe(resul => {
    //   const departmentList = [...state.departments];
    //   const index = departmentList.findIndex(item => item.id === department.id);
    //   departmentList[index] = resul;
    //   ctx.setState({
    //     ...state,
    //     departments: departmentList,
    //   });
    //   this.notiService.showNoti('Cập nhật thành công', 'success');
    // }, error => {
    // });
  }

  @Action(DeleteDepartment)
  async deleteDepartment(ctx: StateContext<DepartmentModel>, {stt}: DeleteDepartment) {
    await this.departmentService.deleteDepartment(stt).toPromise().then(() => {
      this.notiService.deleteSuccess();
    })
    //   .subscribe(result => {
    //   const state = ctx.getState();
    //   const filteredArray = state.departments.filter(item => item.id !== stt);
    //   ctx.patchState({
    //     ...state,
    //     departments: filteredArray
    //   })
    //   this.notiService.showNoti('Xoá thành công!', 'success');
    // }, error => {
    // });
  }

  @Action(GetDepartment)
  getDepartment(ctx: StateContext<DepartmentModel>, {Keyword, nameManagerment, pageSize, skip}: GetDepartment) {
    return this.departmentService.getDepartment(Keyword, nameManagerment, pageSize, skip).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        departments: result.items,
        total: result.totalCount
      });
    })
  }

  @Action(DeleteListDepartment)
  async deleteListDepartment(ctx: StateContext<DepartmentModel>, {listId}: DeleteListDepartment) {
    await this.departmentService.deleteListDepartment(listId).toPromise().then(() => {
      this.notiService.deleteSuccess();
    })
  }

}
