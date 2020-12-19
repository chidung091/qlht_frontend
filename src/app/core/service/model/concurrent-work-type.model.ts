export class ConcurrentWorkTypeModel {
  id?: string;
  creationTime?: string;
  name?: string;
  sectionPerWeek?: number;
  description?: string;
  code?: string;

  constructor(id: string, name: string, code: string, sectionPerWeek: number,description: string) {
  this.name = name;
  this.code = code;
  this.sectionPerWeek = sectionPerWeek;
  this.description = description;
}
}


