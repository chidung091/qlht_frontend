export interface EmployeeSalary{
  id?: string;
  employeeId?:string;  // id cán bộ
  salaryLevel?:string; // bậc lương
  employeeScale?:string; // ngạch hạng
  employeeScaleCode?:string; // mã ngạch hạng
  coefficient?:number; // hệ số lương
  vocationalAllowance?: number; // Mức phụ cấp thu hút nghề
  employeeSalaryAllwanceId?: string;
  preferentialAllowance?: number; // Mức phụ cấp ưu đãi nghề
  prefrentialAllowLeadership?: number; // Mức phụ cấp chức vụ lãnh đạo
  isActive?: boolean; // bắn true
  salaryAmount?:number; // Vượt khung
  appliedDate?:string; // ngày hưởng
  description?:string;  // ghi chú
  salaryLevelName: string, // tên bậc lương
  employeeScaleName: string, // tên ngạch hạng
  seniorityAllowance: number, // thâm niên
  isFostering: boolean, // bắn false
}
export class ItemEmployeeSalary{
  totalCount: number;
  items: EmployeeSalary[];
}
