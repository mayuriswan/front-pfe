import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AapApiService {

  readonly aapAPIUrl = "https://localhost:7171/api";

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.aapAPIUrl + '/Users');
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

  updateUser(id:number|string, data:any){
    return this.http.put(this.aapAPIUrl + `/Users/${id}`, data);
  }

  deleteUser(id:number|string){
    return this.http.delete(this.aapAPIUrl + `/Users/${id}`);
  }

}
