import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NotiService} from "../service-model/notification.service";
import {EmployeePraiseDisciplineService} from "../service-model/employee-praise-discipline.service";
import {
  Add,
  Delete, GetDiscipline,
  GetPraise,
  Search, SearchDiscipline, SearchPraise
} from '../actions/EmployeePraiseDiscipline.action';
import {EmployeePraiseDiscipline} from "../model/employee-praise-discipline.model";
import {tap} from "rxjs/operators";
import {locale} from '../../_config/i18n/vi';

export interface EmployeePraiseDisciplineModel {
  employeePraiseDisciplines: EmployeePraiseDiscipline[];
  employeePraise: EmployeePraiseDiscipline[];
  employeeDisciplines: EmployeePraiseDiscipline[];
  total: number;
  totalPraise: number;
  totalDiscipline: number;

  employeePraiseAfterSearch: EmployeePraiseDiscipline[];
  employeeDisciplinesAfterSearch: EmployeePraiseDiscipline[];
  totalPraiseAfterSearch: number;
  totalDisciplineAfterSearch: number;
}

@State<EmployeePraiseDisciplineModel>({
  name: 'employeePraiseDiscipline',
  defaults: {
    employeePraiseDisciplines: [],
    employeePraise:[],
    employeeDisciplines:[],
    total: 0,
    totalPraise: 0,
    totalDiscipline: 0,
    employeePraiseAfterSearch:[],
    employeeDisciplinesAfterSearch:[],
    totalPraiseAfterSearch: 0,
    totalDisciplineAfterSearch: 0
  }
})
@Injectable()
export class EmployeePraiseDisciplineState {
  constructor(private employeePraiseDisciplineService: EmployeePraiseDisciplineService,
              private notiService: NotiService,
              private store: Store) {
  }

  // lưu giữ liệu sau khi thực hiện action
  @Selector()
  static getE(state: EmployeePraiseDisciplineModel): EmployeePraiseDiscipline[] {
    return state.employeePraiseDisciplines;
  }
  @Selector()
  static getPraise(state: EmployeePraiseDisciplineModel): EmployeePraiseDiscipline[] {
    return state.employeePraise;
  }
  @Selector()
  static getDisciplines(state: EmployeePraiseDisciplineModel): EmployeePraiseDiscipline[] {
    return state.employeeDisciplines;
  }

  @Selector()
  static getTotal(state: EmployeePraiseDisciplineModel): number {
    return state.total;
  }
  @Selector()
  static getTotalPraise(state: EmployeePraiseDisciplineModel): number {
    return state.totalPraise;
  }
  @Selector()
  static getTotalDiscipline(state: EmployeePraiseDisciplineModel): number {
    return state.totalDiscipline;
  }
  // search
  @Selector()
  static getPraiseAfterSearch(state: EmployeePraiseDisciplineModel): EmployeePraiseDiscipline[] {
    return state.employeePraiseAfterSearch;
  }
  @Selector()
  static getDisciplinesAfterSearch(state: EmployeePraiseDisciplineModel): EmployeePraiseDiscipline[] {
    return state.employeeDisciplinesAfterSearch;
  }
  @Selector()
  static getTotalPraiseAfterSearch(state: EmployeePraiseDisciplineModel): number {
    return state.totalPraiseAfterSearch;
  }
  @Selector()
  static getTotalDisciplineAfterSearch(state: EmployeePraiseDisciplineModel): number {
    return state.totalDisciplineAfterSearch;
  }

  @Action(GetPraise)
  getPraise(ctx: StateContext<EmployeePraiseDisciplineModel>, { pageSize, skip}: GetPraise) {
    return this.employeePraiseDisciplineService.getPraise( pageSize, skip).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({...state,
        // employeePraiseDisciplines: result.items,
        employeePraise: result.items,
        // employeePraise: praise,
        totalPraise: result.totalCount
      });
      // ctx.setState({
      //   ...state,
      //   employeePraiseDisciplines: result.items.map(v => {
      //     return {
      //       id: v.id,
      //       tenCanBo: v.tenCanBo,
      //       tenToBoMon:v.tenToBoMon,
      //       hinhThucId: v.hinhThucId,
      //       lyDo: v.lyDo,
      //       cap: v.cap,
      //       soQuyetDinh: v.soQuyetDinh,
      //       ngayQuyetDinh:v.ngayQuyetDinh,
      //       ghiChu: v.ghiChu
      //     }
      //   }),
      //   total: result.totalCount
      // });
    })
  }

  @Action(GetDiscipline)
  getDiscipline(ctx: StateContext<EmployeePraiseDisciplineModel>, { pageSize, skip}: GetDiscipline) {
    return this.employeePraiseDisciplineService.getDiscipline( pageSize, skip).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({...state,
        employeeDisciplines: result.items,
        totalDiscipline: result.totalCount
      });
    })
  }

  @Action(Add)
  addEmployeePraiseDiscipline({getState, patchState}: StateContext<EmployeePraiseDisciplineModel>, {employeePraiseDiscipline}: Add) {
    return this.employeePraiseDisciplineService.add(employeePraiseDiscipline).pipe(tap((result) => {
      const state = getState();
      patchState({
        employeePraiseDisciplines: [...state.employeePraiseDisciplines, result]
      });
      this.notiService.createSuccess();
    }));
  }

  @Action(Delete)
  deleteRole({getState, setState}: StateContext<EmployeePraiseDisciplineModel>, {id}: Delete) {
    return this.employeePraiseDisciplineService.delete(id).pipe(tap(() => {
      // const state = getState();
      // const filteredArray = state.employeePraiseDisciplines.filter(item => item.id !== id);
      // setState({
      //   ...state,
      //   employeePraiseDisciplines: filteredArray,
      // });
      this.notiService.deleteSuccess();
    }));
  }
  // @Action(Search)
  // searchEmployee({patchState}: StateContext<EmployeePraiseDisciplineModel>, {canBoId,toBoMonId,pageSize,skip}: Search) {
  // return  this.employeePraiseDisciplineService.search(toBoMonId,canBoId,pageSize,skip).subscribe((result) => {
  //   var praise = result.items.filter(item=> item.isKhenThuong== true);
  //   var discip = result.items.filter(item=> item.isKhenThuong== false);
  //
  //    patchState({
  //      employeePraiseDisciplines : result.items,
  //      employeeDisciplines: discip,
  //      employeePraise: praise,
  //    })
  //   })
  // }

  // search

  @Action(SearchPraise)
  getPraiseAfterSearch(ctx: StateContext<EmployeePraiseDisciplineModel>, {toBoMonId,canBoId, pageSize, skip}: SearchPraise) {
    return this.employeePraiseDisciplineService.searchPraise(toBoMonId,canBoId, pageSize, skip).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({...state,
        employeePraiseAfterSearch: result.items,
        totalPraiseAfterSearch: result.totalCount
      });
    })
  }

  @Action(SearchDiscipline)
  getDisciplineAfterSearch(ctx: StateContext<EmployeePraiseDisciplineModel>, {toBoMonId,canBoId, pageSize, skip}: SearchDiscipline) {
    return this.employeePraiseDisciplineService.searchDiscipline(toBoMonId,canBoId, pageSize, skip).subscribe(result => {
      const state = ctx.getState();
      ctx.setState({...state,
        employeeDisciplinesAfterSearch: result.items,
        totalDisciplineAfterSearch: result.totalCount
      });
    })
  }
}
