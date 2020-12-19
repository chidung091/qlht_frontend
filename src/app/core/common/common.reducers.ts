import {SchoolFacultyModel} from './model/school-faculty.model';
import {SchoolFacultyActions, SchoolFacultyActionTypes} from './common.action';
import {PublicServantModel} from './model/public-servant.model';

export interface SchoolFacultyState {
  allSchoolFaculty: SchoolFacultyModel[];
  allSchoolFacultyLoaded: boolean;
  publicServant: PublicServantModel[];
  publicServantLoaded: boolean;
}

export const initialSchoolFacultyState: SchoolFacultyState = {
  allSchoolFaculty: undefined,
  allSchoolFacultyLoaded: true,
  publicServant: undefined,
  publicServantLoaded: false,
}

export function commonReducer(
  state = initialSchoolFacultyState,
  action: SchoolFacultyActions
): SchoolFacultyState {
  switch (action.type) {
    case SchoolFacultyActionTypes.GetAllSchoolFaculty:
      return {
        ...state,
        allSchoolFacultyLoaded: false,
      }
    case SchoolFacultyActionTypes.AllSchoolFacultyLoaded:
      return {
        ...state,
        allSchoolFaculty: action.listSchoolFaculty,
        allSchoolFacultyLoaded: true,
      }
    case SchoolFacultyActionTypes.GetAllPublicServantCategory:
      return {
        ...state,
        publicServantLoaded: false,
      }
    case SchoolFacultyActionTypes.AllPublicServantCategoryLoaded:
      return {
        ...state,
        publicServantLoaded: true,
        publicServant: action.listPublicServant
      }
    default:
      return state
  }
}
