
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:5128/api/ProjectCalls'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  submitForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}


