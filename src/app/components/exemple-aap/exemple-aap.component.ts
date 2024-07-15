import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exemple-aap',
  templateUrl: './exemple-aap.component.html',
  styleUrls: ['./exemple-aap.component.css']
})
export class ExempleAapComponent implements OnInit {
  project: any;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private aapApiService: AapApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.route.snapshot.url.join('/') } });
      return;
    }
    if (projectId !== null) {
      this.getProjectDetails(projectId);
    }
  }

  getProjectDetails(projectId: string) {
    this.aapApiService.getProjectById(parseInt(projectId, 10)).subscribe(
      (project) => {
        this.project = project;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  getDocumentUrl() {
    if (this.project && this.project.id) {
      return this.aapApiService.getProjectDocumentUrl(this.project.id);
    }
    return '';
  }

  getPhotoUrl() {
    if (this.project && this.project.id) {
      return this.aapApiService.getProjectPhotoUrl(this.project.id);
    }
    return '';
  }

  navigateToEvaluationForm(): void {
    if (this.project && this.currentUser) {
      this.aapApiService.hasUserSubmitted(this.project.id, this.currentUser.id).subscribe(
        (hasSubmitted) => {
          if (hasSubmitted) {
            this.snackBar.open('You have already submitted for this project.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else if (this.project.nombreSubmissions < this.project.acceptedSubmissions) {
            this.router.navigate(['/evaluation-form', this.project.evaluationFormId, this.project.id]);
          } else {
            this.snackBar.open('The maximum number of submissions has been reached.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        },
        (error) => {
          console.error('Error checking user submission:', error);
        }
      );
    }
  }
}
