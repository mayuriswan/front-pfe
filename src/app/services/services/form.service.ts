import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Formulaire } from '../../models/formulaire.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:7171/api/Formulaires'; // Remplacez par votre URL d'API réelle

  constructor(private http: HttpClient) { }

  createFormulaire(formulaire: Formulaire): Observable<Formulaire> {
    return this.http.post<Formulaire>(this.apiUrl, formulaire);
  }

  getFormulaires(): Observable<Formulaire[]> {
    return this.http.get<Formulaire[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<Formulaire[]>('getFormulaires', []))
      );
  }
  updateFormulaire(id: number, formulaire: Formulaire): Observable<Formulaire> {
    return this.http.put<Formulaire>(`${this.apiUrl}/${id}`, formulaire);
  }

  deleteFormulaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  saveForm(formData: any): Observable<Formulaire> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Formulaire>(`${this.apiUrl}`, formData, { headers })
      .pipe(
        catchError(this.handleError<Formulaire>('saveForm'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  submitForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}

