import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AapApiService } from 'src/app/services/aap-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aap',
  templateUrl: './aap.component.html',
  styleUrls: ['./aap.component.css']
})
export class AapComponent implements OnInit {
  projects: any[] = [];
  users: any[] = [];
  selectedProject: any = null;
  searchTerm: string = '';

  constructor(private aapApiService: AapApiService, private router: Router) {}

  ngOnInit() {
    this.getProjectsAndUsers();
  }

  getProjectsAndUsers() {
    forkJoin([
      this.aapApiService.getProjects(),
      this.aapApiService.getUserList()
    ]).subscribe(
      ([projects, users]) => {
        this.projects = projects;
        this.users = users;
        this.mapResponsiblePersonToProject();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  mapResponsiblePersonToProject() {
    this.projects.forEach(project => {
      const responsiblePerson = this.users.find(user => user.id === project.responsiblePersonId);
      if (responsiblePerson) {
        project.responsiblePerson = responsiblePerson;
      }
    });
  }

  get filteredProjects() {
    return this.projects.filter(project =>
      project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onProjectClick(project: any) {
    this.selectedProject = project;
  }

  closeDetails() {
    this.selectedProject = null;
  }

  viewProjectDetails(projectId: number) {
    this.router.navigate(['/project-details', projectId]);
  }
}
