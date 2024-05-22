import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AapApiService {
  
  readonly aapAPIUrl = "https://localhost:7171/api";

  constructor(private http: HttpClient) { }

  authenticateUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.aapAPIUrl + '/Users/authenticate', { email, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/Users');
  }

  getAapList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/Aaps');
  }

  addUser(data: any): Observable<any> {
    return this.http.post(this.aapAPIUrl + '/Users', data, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError('Email already exists');
        }
        return throwError(error);
      })
    );
  }

  addAap(data:any) {
    return this.http.post(this.aapAPIUrl + '/Aaps', data);
  }

  updateUser(id: number | string, data: any): Observable<any> {
    return this.http.put(this.aapAPIUrl + `/Users/${id}`, data);
  }

  updateAap(id: number | string, data: any): Observable<any> {
    return this.http.put(this.aapAPIUrl + `/Aaps/${id}`, data);
  }

  deleteUser(id: number | string): Observable<any> {
    return this.http.delete(this.aapAPIUrl + `/Users/${id}`);
  }

  deleteAap(id: number | string): Observable<any> {
    return this.http.delete(this.aapAPIUrl + `/Aaps/${id}`);
  }
}
