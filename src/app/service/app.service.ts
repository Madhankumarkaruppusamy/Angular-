import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  adddata(data: any) {
    return this._http.post<any>(environment.baseurl + '/api/student/addstudentdetail', data);
  }

  getdata() {
    return this._http.get(environment.baseurl + '/api/student/getstudentdetail')
  }

  putdata(Id: number, data: any) {
    return this._http.put<any>(environment.baseurl + `/api/student/updatestudentdetail/${Id}`, data);
  }

  deletedata(Id: number): Observable<any> {
    return this._http.delete(`${environment.baseurl}/api/student/deletestudentdetail/${Id}`);
  }

}
