import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectCall } from '../models/project-call.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProjectCallService {
  private apiUrl = 'http://localhost:5000/api/ProjectCalls';

  constructor(private http: HttpClient) { }

  getProjectCalls(): Observable<ProjectCall[]> {
    return this.http.get<ProjectCall[]>(this.apiUrl);
  }

  getProjectCall(id: number): Observable<ProjectCall> {
    return this.http.get<ProjectCall>(`${this.apiUrl}/${id}`);
  }

  addProjectCall(projectCall: ProjectCall): Observable<ProjectCall> {
    return this.http.post<ProjectCall>(this.apiUrl, projectCall);
  }

  updateProjectCall(id: number, projectCall: ProjectCall): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, projectCall);
  }

  deleteProjectCall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
