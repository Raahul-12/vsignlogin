import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:50763/api/addDocH';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  postmethod(userdata: any) {
    return this.http.post(this.baseUrl , userdata, this.httpOptions);
  }
}
