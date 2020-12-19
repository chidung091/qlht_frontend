import {ManagementModel} from '../model/management.model';
import {Selector, State, Action, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ManagermentService} from '../service-model/managerment.service';
import {SubjectModel} from '../model/subject.model';
import {SubjectStateModel} from './subject.state';
import { GetManagerments} from '../actions/managerment-action';
import {GetLopbyKhoi} from "../actions/classroom.action";
import {ClassroomStateModel} from "./classroom.state";

export class ManagermentStateModel {
  management: ManagementModel[];
  managements: ManagementModel[]
}

@State<ManagermentStateModel>({
  name: 'management',
  defaults: {
    management: [],
    managements: []
  }
})
@Injectable()
export class ManagermentState {
  constructor(private managermentService: ManagermentService) {
  }

  @Selector()
  static manager(state: ManagermentStateModel){
    return state.management;
  }

  @Action(GetManagerments)
  getManagerments(ctx: StateContext<ManagermentStateModel>){
    return this.managermentService.getManagerments().subscribe( data => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        management: data.items
      })
    });
  }

}
