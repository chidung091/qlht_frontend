import {Injectable} from "@angular/core";
import {Employee} from "../model/Employee";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {EmployeeService} from "../service-model/employee.service";
import {NotiService} from "../service-model/notification.service";
import {GetEmployeeByFacultyId} from "../actions/Employee.action";
import {tap} from "rxjs/operators";
import {GetDistrictOfProvince} from "../actions/district.action";
import {DistrictStateModel} from "./district.state";


@Injectable()
export class EmployeeStateModel{
  listEmployee: Employee[];
}
@State<EmployeeStateModel>({
  name: 'EmployeeState',
  defaults: {
    listEmployee:[]
  }
})

@Injectable()
export class EmployeeState {
  constructor(private employeeService: EmployeeService,
              private notiService: NotiService) {
  }

  @Selector()
  static getList(state: EmployeeStateModel): Employee[]{
    return state.listEmployee;
  }

  // @Action(GetEmployeeByFacultyId)
  // getEmployeeByFacultyId({getState , setState}: StateContext<EmployeeStateModel>, {facultyId}: GetEmployeeByFacultyId){
  //   return this.employeeService.getEmployeeByFacultyId(facultyId).pipe(tap((result) => {
  //     const state = getState();
  //     setState({
  //       ...state,
  //       listEmployee: result.items
  //     });
  //   }));
  // }
}

