import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GeneralInformationAction, GeneralInformationUpdate} from '../actions/general-information-action';
import {Department} from '../model/department.model';
import {tap} from 'rxjs/operators';
import {TenantModel} from '../model/tenant.model';
import {GeneralInformationService} from '../service-model/general-information.service';
import {NotiService} from '../service-model/notification.service';
import {locale} from '../../_config/i18n/vi';


export interface GeneralInformationStateModel {
  generalInformation: TenantModel;
  tenants: TenantModel[];
}

@State<GeneralInformationStateModel>({
  name:'tenants',
  defaults: {
    tenants:[],
    generalInformation:null
  }
})

@Injectable()
export class GeneralInformationState {
  constructor(private generalInformationService: GeneralInformationService, private notiService: NotiService) {
  }

  @Selector()
  static general(state: GeneralInformationStateModel){
   return state.generalInformation;
  }

  @Action(GeneralInformationAction)
  getGeneralInformation(ctx: StateContext<GeneralInformationStateModel>, {schoolId}: GeneralInformationAction){
    const state = ctx.getState();
      return this.generalInformationService.getOneGeneralInformation(schoolId).pipe(tap((result)=>{
      ctx.patchState({
        generalInformation: result
      })
    }));
  }

  @Action(GeneralInformationUpdate)
  updateGeneralInformation(ctx: StateContext<GeneralInformationStateModel>, {schoolId, payload}: GeneralInformationUpdate){
    return this.generalInformationService.updateGeneralInformation(schoolId, payload).pipe(tap((data) =>{
      // const state = ctx.getState();
      // ctx.setState({
      //   ...state,
      //   generalInformation: payload,
      // });
      ctx.patchState({
        generalInformation: payload
      })
      this.notiService.updateSuccess()
    }))
  }
}
