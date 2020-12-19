import {Action} from '@ngrx/store';
import {SchoolFacultyModel} from './model/school-faculty.model';
import {PublicServantModel} from './model/public-servant.model';

export enum SchoolFacultyActionTypes {
  GetAllSchoolFaculty = '[Faculty] Get all school faculty',
  AllSchoolFacultyLoaded = '[Faculty] All school faculty loaded',
  GetAllPublicServantCategory = '[Public servant] Get all public servant',
  AllPublicServantCategoryLoaded = '[Public servant] All public servant loaded',
}

export class GetAllSchoolFaculty implements Action {
  readonly type = SchoolFacultyActionTypes.GetAllSchoolFaculty;
}

export class AllSchoolFacultyLoaded implements Action {
  readonly type = SchoolFacultyActionTypes.AllSchoolFacultyLoaded;
  constructor(public listSchoolFaculty: SchoolFacultyModel[]) {
  }
}

export class GetAllPublicServantCategory implements Action {
  readonly type = SchoolFacultyActionTypes.GetAllPublicServantCategory;
}

export class AllPublicServantCategoryLoaded implements Action {
  readonly type = SchoolFacultyActionTypes.AllPublicServantCategoryLoaded;
  constructor(public listPublicServant: PublicServantModel[]) {
  }
}

export type SchoolFacultyActions = GetAllSchoolFaculty | AllSchoolFacultyLoaded |
  GetAllPublicServantCategory | AllPublicServantCategoryLoaded;
