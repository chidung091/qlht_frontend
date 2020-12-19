import { Observable } from 'rxjs';
export interface EmployeeWorkingHistory {
    id: string;
    employeeId: string;
    employeeName: string;
    organization: string;
    department: string;
    position: string;
    jobDetail: string;
    fromDate: string;
    toDate: string;
    envidenceFileUrl: string;
}

export interface ItemEmployeeWorkingHistory {
    totalCount: number;
    items: Observable<EmployeeWorkingHistory>[];
}