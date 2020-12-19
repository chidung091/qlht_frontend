import {CatalogModel, ListCatalog} from '../model/catalog.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CatalogService} from '../service-model/catalog.service';
import {GeneralInformationAction} from '../actions/general-information-action';
import {tap} from 'rxjs/operators';
import {GeneralInformationStateModel} from './general-information.state';
import {GetAgency, GetCatalog, GetCatalogOne, GetCatalogTwo} from '../actions/catalog.action';
import {Injectable} from '@angular/core';
import {AgencyModel} from '../model/agency.model';
import {Observable} from 'rxjs';

export interface CatalogStateModel {
  catalogs: CatalogModel[];
  catalogStandard: CatalogModel[];
  catalogLevel: CatalogModel[];
  catalogEdu: CatalogModel[];
  catalogAgency: AgencyModel[];
  catalogTypeSchool: CatalogModel[];
  catalogTypeSchool2: CatalogModel[];
  catalogAreas: CatalogModel[];
  catalogOne: CatalogModel;
  catalogKhoi: CatalogModel[];
  catalogNgoaiNgu: CatalogModel[];
  cataloglopGhep: CatalogModel[];
  catalogKieuLop: CatalogModel[];
  catalogSBHTT: CatalogModel[];
  catalogHNDN: CatalogModel[];
  catalogHTDT: CatalogModel[];
  catalogBSGK: CatalogModel[];
  catalogLDTBD: CatalogModel[];
  catalogTietHocNN: CatalogModel[];
  catalogTwo: CatalogModel[];
  catalogDGVC: CatalogModel[];
  catalogBDTX: CatalogModel[];
  catalogGVDG: CatalogModel[];
  catalogOtherClassroom: CatalogModel[];
  catalogCVKN: CatalogModel[]
}

@State<CatalogStateModel>({
  name: 'catalogs',
  defaults: {
    catalogs: [],
    catalogStandard: [],
    catalogLevel: [],
    catalogEdu: [],
    catalogAgency: [],
    catalogTypeSchool: [],
    catalogTypeSchool2: [],
    catalogAreas: [],
    catalogOne: null,
    catalogKhoi: [],
    catalogNgoaiNgu: undefined,
    cataloglopGhep: [],
    catalogKieuLop: undefined,
    catalogSBHTT: undefined,
    catalogHNDN: undefined,
    catalogHTDT: undefined,
    catalogBSGK: undefined,
    catalogLDTBD: undefined,
    catalogTietHocNN: undefined,
    catalogTwo: [],
    catalogDGVC: [],
    catalogBDTX: [],
    catalogGVDG: [],
    catalogOtherClassroom: undefined,
    catalogCVKN: []
  }
})
@Injectable()
export class CatalogState {
  constructor(private catalogService: CatalogService) {
  }

  //region Selector
  @Selector()
  static getCatalog(state: CatalogStateModel) {
    return state.catalogs;
  }

  @Selector()
  static getCatalogStandard(state: CatalogStateModel) {
    return state.catalogStandard;
  }

  @Selector()
  static getCatalogLevel(state: CatalogStateModel) {
    return state.catalogLevel;
  }

  @Selector()
  static getCatalogTypeEdu(state: CatalogStateModel) {
    return state.catalogEdu;
  }

  @Selector()
  static getCatalogAgency(state: CatalogStateModel) {
    return state.catalogAgency;
  }

  @Selector()
  static getCatalogTypeSchool(state: CatalogStateModel) {
    return state.catalogTypeSchool;
  }

  @Selector()
  static getCatalogTypeEduDetail(state: CatalogStateModel) {
    return state.catalogTypeSchool2;
  }

  @Selector()
  static getCatalogAreas(state: CatalogStateModel) {
    return state.catalogAreas;
  }

  @Selector()
  static getCatalogOne(state: CatalogStateModel) {
    return state.catalogOne;
  }

  @Selector()
  static getCatalogAllKhoi(state: CatalogStateModel) {
    return state.catalogKhoi;
  }

  @Selector()
  static getCatalogAllNgoaiNgu(state: CatalogStateModel) {
    return state.catalogNgoaiNgu;
  }

  @Selector()
  static getCataloglopGhep(state: CatalogStateModel) {
    return state.cataloglopGhep;
  }

  @Selector()
  static getCatalogKieuLop(state: CatalogStateModel) {
    return state.catalogKieuLop;
  }

  @Selector()
  static getCatalogSBHTT(state: CatalogStateModel) {
    return state.catalogSBHTT;
  }

  @Selector()
  static getCatalogHNDN(state: CatalogStateModel) {
    return state.catalogHNDN;
  }

  @Selector()
  static getCatalogHTDT(state: CatalogStateModel) {
    return state.catalogHTDT;
  }

  @Selector()
  static getCatalogBSGK(state: CatalogStateModel) {
    return state.catalogBSGK;
  }

  @Selector()
  static getCatalogLDTBD(state: CatalogStateModel) {
    return state.catalogLDTBD;
  }

  @Selector()
  static getCatalogTietHocNN(state: CatalogStateModel) {
    return state.catalogTietHocNN;
  }

  @Selector()
  static getCatalogTwo(state: CatalogStateModel) {
    return state.catalogTwo;
  }

  @Selector()
  static getCatalogDGVC(state: CatalogStateModel) {
    return state.catalogDGVC;
  }

  @Selector()
  static getCatalogBDTX(state: CatalogStateModel) {
    return state.catalogBDTX;
  }

  @Selector()
  static getCatalogGVG(state: CatalogStateModel) {
    return state.catalogGVDG;
  }

  @Selector()
  static getCatalogOtherClassroom(state: CatalogStateModel) {
    return state.catalogOtherClassroom;
  }
  @Selector()
  static getCatalogCVKN(state: CatalogStateModel){
    return state.catalogCVKN;
  }
  //endregion

  //region Action
  @Action(GetCatalog)
  getCatalog(ctx: StateContext<CatalogStateModel>, {categoryCode}: GetCatalog) {
    return this.catalogService.getCatalog(categoryCode).pipe(tap((result) => {
      const state = ctx.getState();

      switch (categoryCode) {
        case 'DM_MUC_DAT_CHUAN_QG_CLGD':
          ctx.setState({
            ...state,
            catalogStandard: result,
          })
          break;
        case 'DM_CAP_HOC':
          ctx.setState({
            ...state,
            catalogLevel: result,
          })
          break;
        case 'DM_LOAI_HINH':
          ctx.setState({
            ...state,
            catalogEdu: result,
          })
          break;
        case 'DM_LOAI_TRUONG':
          ctx.setState({
            ...state,
            catalogTypeSchool: result,
          })
          break;
          break;
        case 'DM_KHU_VUC':
          ctx.setState({
            ...state,
            catalogAreas: result,
          })
          break;
        case 'DM_DG_VIEN_CHUC':
          ctx.setState({
            ...state,
            catalogDGVC: result,
          })
          break;
        case 'DM_GIAO_VIEN_GIOI':
          ctx.setState({
            ...state,
            catalogGVDG: result,
          })
          break;
        case 'DM_BOI_DUONG_TX':
          ctx.setState({
            ...state,
            catalogBDTX: result,
          })
          break;
        case 'DM_NHIEM_VU_KIEM_NHIEM':
          ctx.setState({
            ...state,
            catalogCVKN: result
          })
          break;
        default:
          ctx.setState({
            ...state,
            catalogs: result,
          })
      }
    }));
  }

  @Action(GetCatalogOne)
  getCatalogOne(ctx: StateContext<CatalogStateModel>, {id}: GetCatalogOne) {
    return this.catalogService.getCatalogOne(id).pipe(tap((result) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        catalogOne: result
      })
    }))
  }

  @Action(GetCatalogTwo)
  getCatalogTwo(ctx: StateContext<CatalogStateModel>, {categoryCode, categoryParentCode}: GetCatalogTwo): Observable<CatalogModel[]> {
    return this.catalogService.getCatalogTwo(categoryCode, categoryParentCode).pipe(tap((result) => {
      const state = ctx.getState();

      switch (categoryCode) {
        case 'DM_KHOI':
          ctx.setState({
            ...state,
            catalogTwo: result,
          })
          break;
        default:
          ctx.setState({
            ...state,
            catalogs: result,
          })

      }
    }));
  }

  @Action(GetAgency)
  getAgency(ctx: StateContext<CatalogStateModel>) {
    return this.catalogService.getAgency().pipe(tap((result) => {
      ctx.patchState({
        catalogAgency: result
      })
    }))
  }

  //endregion

}
