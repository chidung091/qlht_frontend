import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CommonService} from './common.service';
import {
  AllPublicServantCategoryLoaded,
  AllSchoolFacultyLoaded,
  GetAllPublicServantCategory,
  GetAllSchoolFaculty,
  SchoolFacultyActionTypes
} from './common.action';
import {map, mergeMap} from 'rxjs/operators';
import {ListSchoolFacultyModel} from './model/school-faculty.model';
import {PublicServantModel} from './model/public-servant.model';

@Injectable()
export class CommonEffect {
  @Effect()
  loadAllSchoolFaculty$ = this.actions$.pipe(
    ofType<GetAllSchoolFaculty>(SchoolFacultyActionTypes.GetAllSchoolFaculty),
    mergeMap(() => this.service.getAllSchoolFaculty()),
    map((result: ListSchoolFacultyModel) => {
      return new AllSchoolFacultyLoaded(result.items)
    })
  )

  @Effect()
  loadPublicServantCategory$ = this.actions$.pipe(
    ofType<GetAllPublicServantCategory>(SchoolFacultyActionTypes.GetAllPublicServantCategory),
    mergeMap(() => this.service.getAllPublicServant()),
    map((result: PublicServantModel[]) => {
      return new AllPublicServantCategoryLoaded(result)
    })
  )

  constructor(private actions$: Actions,
              private service: CommonService,
              ) {}

}
