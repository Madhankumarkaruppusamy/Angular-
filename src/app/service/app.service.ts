import { HttpClient,HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }
  getdata():Observable<any>{
    return this.http.get("/assets/json-file/data.json")
  }
}
