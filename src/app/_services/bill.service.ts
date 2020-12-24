import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DetailProduct} from "../_models/detailProduct";

@Injectable({
  providedIn: 'root'
})

export class BillService {
  private API = `http://localhost:5035`;
  constructor(private http: HttpClient) { }
  getBill(body: any){
    return this.http.post<any>(`${this.API}/api/bill/showall`,body)
  }
  getDetailProduct(id:string){
    return this.http.get<any>(`${this.API}/api/bill/show/${id}`)
  }
  getAllMedicine():any {
    return this.http.get<any>(`${this.API}/api/medicine/getall`)
  }
  getBillByDate(body: any) {
    return this.http.post<any>(`${this.API}/api/bill/search/date`,body)
  }
}
