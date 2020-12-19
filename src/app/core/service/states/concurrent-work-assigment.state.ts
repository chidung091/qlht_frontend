import {ItemConcurrentWorkAssignmentModel} from "../model/concurrent-work-assignment.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ConcurrentWorkAssigmentService} from "../service-model/concurrent-work-assigment.service";
import {AddConcurrentWAssi, GetListConcurrentWAssiPage} from "../actions/concurrent-work-assigment.action";

export class ConcurrentWorkAssigmentModelState {
  itemConcurrent: ItemConcurrentWorkAssignmentModel
}

@State<ConcurrentWorkAssigmentModelState>({
  name: 'ConcurrentWorkAssigment',
  defaults:{
    itemConcurrent: null
  }
})
@Injectable()
export class ConcurrentWorkAssigmentState {
  constructor(private concurrentWorkAssigmentService: ConcurrentWorkAssigmentService) {
  }

  @Selector()
  static listConcurrentPage(state: ConcurrentWorkAssigmentModelState){
    return state.itemConcurrent;
  }

  @Action(GetListConcurrentWAssiPage)
  getListConcurrentPage(ctx: StateContext<ConcurrentWorkAssigmentModelState>, defau: GetListConcurrentWAssiPage){
   // return this.concurrentWorkAssigmentService.getConcurrentPage(defau.namHocId,defau.pageSize,defau.skip).toPromise();
    return null;
  }

  @Action(AddConcurrentWAssi)
  addListConcurrentPage(ctx: StateContext<ConcurrentWorkAssigmentModelState>, defau: AddConcurrentWAssi){}
}
