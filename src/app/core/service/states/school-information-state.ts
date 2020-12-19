import {SchoolInformationModel} from '../model/school-information.model';
import {SchoolInformationService} from '../service-model/school-information.service';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AddData,
  DeleteData,
  DeleteMultiple, GetAllSchoolSubsidiary,
  GetData,
  GetDataSchoolInformationSubding,
  SelectedData,
  UpdateData
} from '../actions/school-information-action';
import {tap} from 'rxjs/operators';
import {NotiService} from '../service-model/notification.service';

// @ts-ignore
@Injectable()
export class SchoolInformationStateModel{
  allSubsidiary: SchoolInformationModel[];
  data: SchoolInformationModel[];
  selectedData: SchoolInformationModel;
  totalCount: number;
}

@State<SchoolInformationStateModel>({
  name: 'SchoolInformationState',
  defaults: {
    allSubsidiary: [],
    data: [],
    selectedData: null,
    totalCount: 0,
  }
})

@Injectable()
export class SchoolInformationState {
  constructor(private schoolInformationServiceService: SchoolInformationService,
              private notiService: NotiService) {
  }

  @Selector()
  static getList(state: SchoolInformationStateModel): SchoolInformationModel[]{
    return state.data;
  }

  @Selector()
  static getTotalItem(state: SchoolInformationStateModel): number {
    return state.totalCount;
  }

  @Selector()
  // tslint:disable-next-line:typedef
  static getDataSelected(states: SchoolInformationStateModel){
    return states.selectedData;
  }

  @Selector()
  static getAllSubsidiary(state: SchoolInformationStateModel) {
    return state.allSubsidiary;
  }

  @Action(GetAllSchoolSubsidiary)
  getData(ctx: StateContext<SchoolInformationStateModel>){
    return this.schoolInformationServiceService.apiGetAll().pipe(tap(result => {
      ctx.patchState({
        allSubsidiary: result,
      })
      // const state = getState();
      // setState({
      //   ...state,
      //   allSubsidiary: result
      // });
    }));
  }

  // @ts-ignore
  @Action(AddData)
  // tslint:disable-next-line:typedef
 async addData({getState, patchState}: StateContext<SchoolInformationStateModel>, { createData }: AddData) {
    await this.schoolInformationServiceService.apiAdd(createData).toPromise();
    // pipe(tap((result) => {
    //   // const state = getState();
    //   // patchState({
    //   //   data: [...state.data, result]
    //   // });
    //   this.notiService.showNoti('Thêm mới thành công', 'success');
    // }, error => {
    //   this.notiService.showNoti(error.error.error.message, 'error');
    //   // if (error.status === 403) {
    //   //   this.notiService.showNoti('Thông tin điểm trường phụ bị trùng', 'error');
    //   // } else {
    //   //   this.notiService.showNoti('Thông tin điểm trường phụ không đúng', 'error');
    //   // }
    // }))
  }

  @Action(UpdateData)
   async updateData({getState, setState}: StateContext<SchoolInformationStateModel>, {id, updateData}: UpdateData) {
    await this.schoolInformationServiceService.apiUpdate(id, updateData).toPromise();
      // if (error.status === 403) {
      //   this.notiService.showNoti('Thông tin điểm trường phụ bị trùng', 'error');
      // } else {
      //   this.notiService.showNoti('Thông tin điểm trường phụ không thay đổi', 'warning');
      // }
    // }))
  }


  @Action(DeleteData)
  // tslint:disable-next-line:typedef
  async deleteData({getState, setState}: StateContext<SchoolInformationStateModel>, {id}: DeleteData) {
     await  this.schoolInformationServiceService.apiDelete(id).toPromise();
       // .pipe(tap(() => {
      // const state = getState();
      // const filteredArray = state.data.filter(item => item.id !== id);
      // setState({
      //   ...state,
      //   data: filteredArray,
      // });
      // this.notiService.showNoti('Xoá thành công!','success');
    // }));
  }

  @Action(DeleteMultiple)
  async deleteList({getState, setState}: StateContext<SchoolInformationStateModel>, {ids}: DeleteMultiple) {
    await this.schoolInformationServiceService.apiDeleteMany(ids).toPromise();
    //   .subscribe(()=>{
    //   ids.forEach(items => {
    //     const state = getState();
    //     const filteredArray = state.data.filter(item => item.id !== items);
    //     setState({
    //       ...state,
    //       data: filteredArray,
    //     });
    //   })
    //   this.notiService.showNoti('Xóa thành công!', 'success');
    // }, error => {
    //   this.notiService.showNoti(error.error.error.message, 'error');
    // })
  }

  @Action(GetDataSchoolInformationSubding)
  getDataSchoolInformationSubding({getState , setState}: StateContext<SchoolInformationStateModel>,
                                  {maxResultCount, skipCount}: GetDataSchoolInformationSubding) {
    return this.schoolInformationServiceService.getDataSubding(maxResultCount, skipCount).subscribe(result => {
      const state = getState();
      setState({
        ...state,
        data: result.items,
        totalCount: result.totalCount,
      });
    })
  }

  @Action(SelectedData)
  // tslint:disable-next-line:typedef
  selectedData({getState, setState}: StateContext<SchoolInformationStateModel>, {selectedData}: SelectedData) {
    const state = getState();
    setState({
      ...state,
      selectedData
    });
  }

}
