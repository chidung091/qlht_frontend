export class EmployeeForeignLanguageModel {
  id?: string;
  employeeId?: string;
  employeeName?: string;
  languageCode?: string;
  languageName?: string;
  languageLevelCode?: string;
  languageLevelName?: string;
  issuedBy?: string;
  issueDate?: string;
  score?: number;
  description?: string;
  envidenceFileUrl?: string;
}

export class ListEmployeeForeignLanguageModel{
  items?: EmployeeForeignLanguageModel[];
  totalCount?: number;
}

export class FilterEmployeeModel {
  employeeId?: string;
  filter?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;

  constructor(employeeId: string, filter: string, sorting: string, skipCount: number, maxResultCount: number ) {
    this.employeeId = employeeId;
    this.filter = filter;
    this.sorting = sorting;
    this.skipCount = skipCount;
    this.maxResultCount = maxResultCount;
  }
}
