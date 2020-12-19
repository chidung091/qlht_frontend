export interface EmployeeSalary{
  id?: string;
  employeeId?:string;  // id cán bộ
  salaryLevel?:string; // bậc lương
  employeeScale?:string; // ngạch hạng
  employeeScaleCode?:string; // mã ngạch hạng
  isFostering?:boolean; // bồi dưỡng
  coefficient?:string; // hệ số lương
  seniorityAllowances?:string; // mức phụ cấp thâm niên
  salaryAmount?:string; // Vượt khung
  appliedDate?:string; // ngày hưởng
  description?:string;  // ghi chú
}
