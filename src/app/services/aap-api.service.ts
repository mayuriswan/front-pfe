import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  getHostinginstitutionsList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/Hostinginstitutions');
  }

  getTasktypesList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/Tasktypes');
  }

  getFormsList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/Forms');
  }

  getFormFieldsList(): Observable<any[]> {
    return this.http.get<any>(this.aapAPIUrl + '/FormFields');
  }
  // Get all evaluations
  getEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(this.aapAPIUrl + '/Evaluations');
  }
  
  // Get a specific evaluation by ID
  getEvaluation(id: number): Observable<any> {
    return this.http.get<any>(`${this.aapAPIUrl}/Evaluations/${id}`);
  }

  // Add a new evaluation
  createEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(this.aapAPIUrl + '/Evaluations', evaluation);
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

  saveEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(this.aapAPIUrl + '/Evaluations', evaluation);
  }
  addEvaluations(data:any) {
    return this.http.post(this.aapAPIUrl + '/Evaluations', data);
  }

  addForms(data:any) {
    return this.http.post(this.aapAPIUrl + '/Forms', data);
  }

  createForm(data:any): Observable<any> {
    return this.http.post<any>(this.aapAPIUrl, data);
  }

  addFormFields(data:any) {
    return this.http.post(this.aapAPIUrl + '/FormFields', data);
  }

  addInstitution(institution: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.aapAPIUrl}/Hostinginstitutions`, institution);
  }

  addTasktypes(taskType: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.aapAPIUrl}/Tasktypes`, taskType);
  }

  updateUser(id: number | string, data: any): Observable<any> {
    return this.http.put(this.aapAPIUrl + `/Users/${id}`, data);
  }

  deleteUser(id: number | string): Observable<any> {
    return this.http.delete(this.aapAPIUrl + `/Users/${id}`);
  }

  getProjectPhotoUrl(projectId: number) {
    return `${this.aapAPIUrl}/Projects/${projectId}/photo`;
  }
  
  deleteInstitution(id: number | string): Observable<any> {
    return this.http.delete(this.aapAPIUrl + `/Hostinginstitutions/${id}`);
  }

  deleteTasktypes(id: number | string): Observable<any> {
    return this.http.delete(this.aapAPIUrl + `/Tasktypes/${id}`);
  }
  getProjectsForEvaluator(evaluatorId: number): Observable<any[]> {
    console.log(evaluatorId);
    return this.http.get<any[]>(`${this.aapAPIUrl}/projects/evaluator/${evaluatorId}/projects`);
  }
  getProjectsForResponsible(responsibleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.aapAPIUrl}/projects/responsible/${responsibleId}`);
  }
  updateSubmissionStatus(submissionId: number, status: string): Observable<any> {
    const url = `${this.aapAPIUrl}/Submissions/${submissionId}/${status}`;
    console.log('url:', url);
    return this.http.post<any>(url, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating submission status:', error);
        return throwError(error);
      })
    );
  }
 
  getEvaluationForProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.aapAPIUrl}/Evaluations/criteria/${projectId}`);
  }
  
  saveEvaluationNote(evaluationNote: any): Observable<any> {
    return this.http.post<any>(`${this.aapAPIUrl}/Evaluations/evaluationNote`, evaluationNote);
  }


  getEvaluationCriteriaForProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.aapAPIUrl}/Evaluations/project/${projectId}/criteria`);
  }

  updateSubmission(submission: any): Observable<any> {
    return this.http.put<any>(`${this.aapAPIUrl}/Evaluations/submissions/${submission.id}`, submission);
  }

  getSubmissionsForProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.aapAPIUrl}/Projects/${projectId}/submissions`);
  }

  getEvaluationForms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.aapAPIUrl}/EvaluationForms`);
  }
  
  getEvaluationFormById(id: number): Observable<any> {
    return this.http.get<any>(`${this.aapAPIUrl}/EvaluationForms/${id}`);
  }
  
  createEvaluationForm(evaluationForm: any): Observable<any> {
    return this.http.post<any>(`${this.aapAPIUrl}/EvaluationForms`, evaluationForm);
  }

  createProject(project: any): Observable<any> {
    console.log(project);
    return this.http.post<any>(this.aapAPIUrl + '/Projects', project);
  }
  addSubmissionToProject(projectId: number, submission: any): Observable<any> {
    return this.http.post<any>(`${this.aapAPIUrl}/Projects/${projectId}/addSubmission`, submission);
  }
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.aapAPIUrl + '/Projects');
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.aapAPIUrl}/Projects/${id}`);
  }
  
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(this.aapAPIUrl + `/Projects/${id}`, project);
  }
  hasUserSubmitted(projectId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.aapAPIUrl }/Projects/${projectId}/submissions/${userId}`);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(this.aapAPIUrl + `/Projects/${id}`);
  }

  getProjectDocumentUrl(projectId: number) {
    return `${this.aapAPIUrl}/Projects/${projectId}/document`;
  }
}
