export class EmployeeModel{
  code: string;
  identificationCode: string;
  alias: string;
  fullName: string;
  phone: string;
  imageSrc: string;
  signatureSrc: string;
  schoolFacultyId: string;
  schoolFacultyName: string;
  birthDate: string;
  homeTown: string;
  contractType: string;
  subjectTaught: string;
  birthPlace: string;
  sexCode: string;
  sexName: string;
  joinedDate: string;
  isLeader: boolean;
  isNew: boolean
  identityNumber: string;
  identityIssuedDate: string;
  identityIssuedPlace: string;
  email: string;
  nation: string;
  nationName: string;
  religion: string;
  religionName: string;
  healthStatus: string;
  status: string;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  communeCode: string;
  communeName: string;
  insuranceNumber: string;
  tenantId: string;
  fatherFullName: string;
  fatherBirthDate: string;
  fatherJob: string;
  fatherWorkingPlace: string;
  motherFullName: string;
  motherBirthDate: string;
  motherJob: string;
  motherWorkingPlace: string;
  spouseFullName: string;
  spouseBirthDate: string;
  spouseJob: string;
  spouseWorkingPlace: string;
  positionStaffCode: string;
  positionStaffName: string;
  positionGroupCode: string;
  positionGroupName: string;
  concurrentSubjectCode: string;
  concurrentSubjectName: string;
  familyTypeCode: string;
  familyTypeName: string;
  mariageStatusCode: string;
  mariageStatusName: string;
  otherNote: string;
  isRegularRefresher: true;
  isTeacherDuties: true;
  isMotelRoomOutsite: true;
  isNeedTeacherDuties: true;
  isCommunistPartyMember: true;
  partyJoinedDate: string;
  partyJoinedPlace: string;
  isYouthLeageMember: boolean;
  youthLeageJoinDate: string;
  youthLeageJoinPlace: string;
  lstQualification: Qualification[];
}

export class Qualification {
  categoryCode: string;
  categoryName: string;
  categoryTypeCode: string
}

export class ListEmployeeModel{
  items: EmployeeModel[];
}
