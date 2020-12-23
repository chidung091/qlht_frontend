import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BillService {
  private API = `http://chidung091.ddns.net:5035`;
  constructor(private http: HttpClient) { }
  getBill(body: any){
    return this.http.post<any>(`${this.API}/api/bill/showall`,body)
  }
}
