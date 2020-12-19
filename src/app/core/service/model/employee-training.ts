export interface EmployeeTraining{
    id: string;
    employeeId: string;
    employeeName: string;
    trainingPlace: string;
    trainingFormCode: string;
    trainingFormName: string;
    specializedCode:  string;
    specializedName: string;
    diplomaCode: string;
    diplomaName: string;
    fromDate: string;
    toDate: string;
    description: string;
    envidenceFileUrl: string;
  }
  
  export interface ItemEmployeeTraining{
    totalCount: number;
    items: EmployeeTraining[];
  }
  