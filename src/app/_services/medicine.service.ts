import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medicine} from '../_models/medicine';
import {Observable} from "rxjs";
import {ItemMedicine} from "../_models/itemMedicine";

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private API = `http://localhost:5035`;
  // private API = `http://chidung091.ddns.net:5035`;

  constructor(private http: HttpClient) { }

  getMedicine(body: any):Observable<any>{
    return this.http.post<any>(`${this.API}/api/medicine/all`,body);
  }

  createMedicine(medicine: Medicine) {
    return this.http.post<Medicine>(`${this.API}/api/medicine/create`, medicine);
  }

  updateMedicine(medicine: any, id: string) {
    return this.http.put<Medicine>(`${this.API}/api/medicine/update/${id}`, medicine);
  }

  deleteMedicineById(id: string) {
    return this.http.delete<Medicine>(`${this.API}/api/medicine/delete/${id}`);
  }
  searchByName(body: any) {
    return this.http.post<any>(`${this.API}/api/medicine/search/name`, body);
  }
}

