import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-project-details-component',
  templateUrl: './project-details-component.component.html',
  styleUrls: ['./project-details-component.component.css']
})
export class ProjectDetailsComponentComponent implements OnInit {
  project: any;
  responsiblePersonName: string = '';
  hostingInstitutionName: string = '';
  taskTypeName: string = '';

  constructor(
    private route: ActivatedRoute,
    private aapApiService: AapApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId !== null) {
      this.getProjectDetails(projectId);
    }
  }

  getProjectDetails(projectId: string) {
    this.aapApiService.getProjectById(parseInt(projectId, 10)).subscribe(
      (project) => {
        this.project = project;
        this.getResponsiblePersonName(project.responsiblePersonId);
        this.getHostingInstitutionName(project.hostingInstitutionId);
        this.getTaskTypeName(project.taskTypeId);
        this.getEvaluationFormById(this.project.evaluationFormId);
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  getResponsiblePersonName(responsiblePersonId: number) {
    this.aapApiService.getUserList().subscribe(
      (users) => {
        const user = users.find((u: any) => u.id === responsiblePersonId);
        if (user) {
          this.responsiblePersonName = `${user.firstname} ${user.lastname}`;
        } else {
          this.responsiblePersonName = 'Not Found';
        }
      },
      (error) => {
        console.error('Error fetching responsible person details:', error);
        this.responsiblePersonName = 'Error fetching name';
      }
    );
  }

  getHostingInstitutionName(hostingInstitutionId: number) {
    this.aapApiService.getHostinginstitutionsList().subscribe(
      (institutions) => {
        const institution = institutions.find((inst: any) => inst.id === hostingInstitutionId);
        if (institution) {
          this.hostingInstitutionName = institution.name;
        } else {
          this.hostingInstitutionName = 'Not Found';
        }
      },
      (error) => {
        console.error('Error fetching hosting institution details:', error);
        this.hostingInstitutionName = 'Error fetching name';
      }
    );
  }

  getTaskTypeName(taskTypeId: number) {
    this.aapApiService.getTasktypesList().subscribe(
      (taskTypes) => {
        const taskType = taskTypes.find((type: any) => type.id === taskTypeId);
        if (taskType) {
          this.taskTypeName = taskType.name;
        } else {
          this.taskTypeName = 'Not Found';
        }
      },
      (error) => {
        console.error('Error fetching task type details:', error);
        this.taskTypeName = 'Error fetching name';
      }
    );
  }

  getEvaluationFormById(evaluationFormId: number) {
    this.aapApiService.getEvaluationFormById(evaluationFormId).subscribe(
      (form) => {
        this.project.evaluationForm = form;
      },
      (error) => {
        console.error('Failed to fetch evaluation forms:', error);
      }
    );
  }

  openEvaluationForm(form: any, event: Event) {
    event.stopPropagation();
    const formUrl = `/evaluation-form/${form.id}`;
    window.open(formUrl, '_blank');
  }

  getDocumentUrl() {
    if (this.project && this.project.id) {
      return this.aapApiService.getProjectDocumentUrl(this.project.id);
    }
    return '';
  }
  getNumberofDocuments(){
    return this.project.nombreSubmissions*this.project.evaluationForm.steps.FormFieldsvalue.find((field:any)=>field.type=="Document").length;
  }
  getPhotoUrl() {
    if (this.project && this.project.id) {
      return this.aapApiService.getProjectPhotoUrl(this.project.id);
    }
    return '';
  }
}
