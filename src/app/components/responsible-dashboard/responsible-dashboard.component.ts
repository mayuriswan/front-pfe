import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AapApiService } from 'src/app/services/aap-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-responsible-dashboard',
  templateUrl: './responsible-dashboard.component.html',
  styleUrls: ['./responsible-dashboard.component.css']
})
export class ResponsibleDashboardComponent implements OnInit {
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
      this.authService.logout();
    }
  }

  loadProjects() {
    this.aapApiService.getProjectsForResponsible(this.currentUser.id).subscribe(
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
        console.log('submissions:', submissions);
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

  acceptSubmission(submission: any) {
    this.aapApiService.updateSubmissionStatus(submission.id, 'accept').subscribe(
      () => {
        this.snackBar.open('Submission accepted', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        submission.isAccepted = true;
      },
      (error) => {
        console.error('Error accepting submission:', error);
        this.snackBar.open('Error accepting submission', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  rejectSubmission(submission: any) {
    this.aapApiService.updateSubmissionStatus(submission.id, 'reject').subscribe(
      () => {
        this.snackBar.open('Submission rejected', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        submission.isAccepted = false;
      },
      (error) => {
        console.error('Error rejecting submission:', error);
        this.snackBar.open('Error rejecting submission', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }
  calculateGlobalNote(submission: any): number {
    if (!submission.evaluationNotes || submission.evaluationNotes.length === 0) {
      return 0;
    }
    const totalNote = submission.evaluationNotes.reduce((sum: number, note: any) => sum + note.globalNote, 0);
    return totalNote / submission.evaluationNotes.length;
  }

  getEvaluationStatus(submission: any): string {
    return submission.evaluationNotes && submission.evaluationNotes.length > 0
      ? `Evaluated: ${this.calculateGlobalNote(submission)} / ${submission.evaluationNotes[0].baseNote}`
      : 'Not evaluated yet';
  }
}
