import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AapApiService } from 'src/app/services/aap-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-evaluator-home',
  templateUrl: './evaluator-home.component.html',
  styleUrls: ['./evaluator-home.component.css']
})
export class EvaluatorHomeComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;
  submissions: any[] = [];
  currentUser: any;

  constructor(
    private aapApiService: AapApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadProjects();
    } else {
      // Redirect to login if user is not logged in
      this.authService.logout();
    }
  }

  loadProjects() {
    this.aapApiService.getProjectsForEvaluator(this.currentUser.id).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.snackBar.open('Error fetching projects', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  selectProject(project: any) {
    this.selectedProject = project;
    this.loadSubmissions(project.id);
  }

  loadSubmissions(projectId: number) {
    this.aapApiService.getSubmissionsForProject(projectId).subscribe(
      (submissions) => {
        this.submissions = submissions;
      },
      (error) => {
        console.error('Error fetching submissions:', error);
        this.snackBar.open('Error fetching submissions', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  evaluateSubmission(submission: any) {
    console.log('Evaluate submission:', submission);
    // Navigate to evaluation page or open evaluation modal
  }
}
