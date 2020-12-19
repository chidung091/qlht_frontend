import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Category } from '../_models/category.model';

@Injectable({providedIn: 'root'})
export class CategoryService {

    private resourceUrl = env.API_GATEWAY_ENDPOINT;
    constructor(
        private http: HttpClient
    ){}

    getCateByCode(code: string): Observable<Category[]> {
        return this.http.get<Category[]>(this.resourceUrl + `danh-muc/loai-danh-muc/${code}`);
    }

    getCateWithParent(cateCode: string, parentCode: string): Observable<Category[]> {
      return this.http.get<Category[]>(this.resourceUrl+`danh-muc/loai-danh-muc/${cateCode}/${parentCode}`)
    }

    getCateById(id: string): Observable<Category> {
        return this.http.get<Category>(this.resourceUrl + `danh-muc/${id}`);
    }
}
