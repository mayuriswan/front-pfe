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
  selectedSubmission: any = null;
  evaluation: any = null;
  evaluationNote: any = {
    baseNote: 0,
    globalNote: 0,
    comments: '',
    criteriaNotes: []
  };
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

  isSubmissionEvaluatedByUser(submission: any): boolean {
    submission.globalNote = submission.evaluationNotes?.find((note: any) => note.evaluatorId === this.currentUser.id)?.globalNote;
    return submission.evaluationNotes?.some((note: any) => note.evaluatorId === this.currentUser.id);

  }

  evaluateSubmission(submission: any) {
    this.selectedSubmission = submission;
    this.loadEvaluation(this.selectedProject.evaluationId);
  }

  loadEvaluation(projectId: number) {
    this.aapApiService.getEvaluationForProject(projectId).subscribe(
      (evaluation) => {
        this.evaluation = evaluation;
        this.initializeEvaluationNote();
      },
      (error) => {
        console.error('Error fetching evaluation:', error);
        this.snackBar.open('Error fetching evaluation', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  initializeEvaluationNote() {
    this.evaluationNote = {
      baseNote: this.evaluation.baseDeNotation,
      globalNote: 0,
      comments: '',
      criteriaNotes: this.evaluation.criteria.map((criterion:any) => ({
        criterionId: criterion.id,
        criterionName: criterion.criterion,
        baseDeNotation: criterion.note,
        note: 0
      }))
    };
  }

  calculateGlobalNote() {
    let totalNote = 0;
    for (const criterion of this.evaluationNote.criteriaNotes) {
      totalNote += criterion.note;
    }
    this.evaluationNote.globalNote = totalNote;
    return totalNote;
  }

  saveEvaluation() {
    if (this.selectedSubmission && this.evaluationNote) {
      const evaluationToSave = {
        Id: 0,
        evaluatorId: this.currentUser.id,
        submissionId: this.selectedSubmission.id,
        baseNote: this.evaluationNote.baseNote,
        globalNote: this.calculateGlobalNote(),
        comments: this.evaluationNote.comments,
        criteriaNotes: this.evaluationNote.criteriaNotes.map((criterionNote:any) => ({
          criterionId: criterionNote.criterionId,
          criterionName: criterionNote.criterionName,
          note: criterionNote.note,
          Id: 0 // Ensure note is less than or equal to base note
        }))
      };
  
      console.log('Evaluation to save:', evaluationToSave);
  
      this.aapApiService.saveEvaluationNote(evaluationToSave).subscribe(
        (response) => {
          this.snackBar.open('Evaluation saved successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.selectedSubmission.evaluationNotes.push(response);
          this.selectedSubmission.globalNote = this.calculateGlobalNote();
          this.selectedSubmission.isEvaluated = true;
          this.selectedSubmission = null; // Hide the evaluation form
        },
        (error) => {
          console.error('Error saving evaluation:', error);
          this.snackBar.open('Error saving evaluation', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}
