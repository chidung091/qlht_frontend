import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../model/grid-param';
import {HttpClient} from '@angular/common/http';
import {ItemExamViolationTypeModel} from '../model/item-exam-violation-type.model';
import {ExamViolationTypeModel} from '../model/exam-violation-type.model';

@Injectable({
  providedIn: 'root'
})
export class ExamViolationTypeService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private inforFind: GridParam;
  constructor(private http: HttpClient) { }
  getAllExam(){
    return this.http.get<ItemExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/tat-ca`)
  }
  postExam(examViolationTypeModel: ExamViolationTypeModel){
    return this.http.post<ExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/tao`, examViolationTypeModel)
  }
  deleteListExam(ids: string[]){
    return this.http.post<ExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/xoa-danh-sach`, ids)
  }
  putExam(id: string, examViolationTypeModel: ExamViolationTypeModel){
    return this.http.put<ExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/sua/${id}`,examViolationTypeModel)
  }
  deleteExam(id: string){
    return this.http.delete<ExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/xoa/${id}`)
  }
  getPaginationExam(keyword: string, pageSize: number, skip: number){
    // if (!keyword) {
    //   keyword = '';
    // }
    // if (nameManagement === undefined) {
    //   nameManagement = 0;
    // }
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationTime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    // this.inforFind.filterItems.push({
    //     value: keyword,
    //     propertyName: 'tenLoiViPham',
    //     comparison: ComparisonOperator.Contains
    //   } as FilterItems,
    //   {
    //     value: nameManagement,
    //     propertyName: 'nguoiViPham',
    //     comparison: ComparisonOperator.Equal
    //   } as FilterItems);
    if(keyword){
      const params = {
        value: keyword,
        propertyName: 'name',
        comparison: ComparisonOperator.Contains
      } as FilterItems;
      this.inforFind.filterItems.push(params)
    };
    this.inforFind.skipCount = skip;
    this.inforFind.maxResultCount = pageSize;
    return this.http.post<ItemExamViolationTypeModel>(`${this.API}danh-muc-truong/loi-vi-pham-quy-che-thi/phan-trang`, this.inforFind);
  }
}
