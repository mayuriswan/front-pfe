import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';
import { AuthService } from 'src/app/services/auth.service';

interface Field {
  id: number;
  name: string;
  value: any;
  type: string;
  options?: string;
  stepId: number;
  error: string | undefined;
}

interface Step {
  id: number;
  name: string;
  fields: Field[];
  evaluationFormId: number;
}

interface Form {
  id: number;
  name: string;
  steps: Step[];
}

@Component({
  selector: 'app-evaluation-project-component',
  templateUrl: './evaluation-project-component.component.html',
  styleUrls: ['./evaluation-project-component.component.css']
})
export class EvaluationProjectComponentComponent implements OnInit {
  formId: number | undefined;
  projectId: number | undefined;
  form: Form | undefined;
  project: any;
  currentStepIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: AapApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formId = +params['id'];
      this.projectId = +params['projectId'];  // Assuming projectId is passed as a route parameter
      this.fetchEvaluationForm();
      this.fetchProjectDetails();
    });
  }

  fetchEvaluationForm(): void {
    if (this.formId) {
      this.apiService.getEvaluationFormById(this.formId).subscribe(
        (form: Form) => {
          this.form = form;
          console.log('Evaluation form data:', this.form);
        },
        (error) => {
          console.error('Failed to fetch evaluation form:', error);
        }
      );
    }
  }

  fetchProjectDetails(): void {
    if (this.projectId) {
      this.apiService.getProjectById(this.projectId).subscribe(
        (project: any) => {
          this.project = project;
          console.log('Project data:', this.project);
        },
        (error) => {
          console.error('Failed to fetch project details:', error);
        }
      );
    }
  }

  getOptions(options: string | undefined): string[] {
    return options ? options.split(',').map(option => option.trim()) : [];
  }

  nextStep(): void {
    if (this.currentStepIndex < (this.form?.steps.length ?? 0) - 1) {
      this.currentStepIndex++;
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  isLastStep(): boolean {
    return this.currentStepIndex === (this.form?.steps.length ?? 0) - 1;
  }

  goToStep(index: number): void {
    this.currentStepIndex = index;
  }

  getProgressPercentage(): number {
    return ((this.currentStepIndex + 1) / (this.form?.steps.length ?? 1)) * 100;
  }

  captureUserInput(): void {
    if (this.form) {
      this.form.steps.forEach(step => {
        step.fields.forEach(field => {
          const inputElement = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
          if (inputElement) {
            field.value = inputElement.value;
          }
        });
      });
    }
  }
  convertValueToString(value: any): string {
    if (typeof value === 'number') {
      return value.toString();
    } else if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    } else if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  }
  onSubmit(): void {
    this.captureUserInput();

    if (this.isLastStep()) {
     
        const currentUser = this.authService.getCurrentUser();
 
  const submissionDetails = {
    id: "0",
    projectId: String(this.projectId),
    submissionDate: new Date(),
    userId: String(currentUser?.id),
    stepValues: this.form?.steps.map(step => ({
      id: 0,
      name: step.name,
      fields: step.fields.map(field => ({
        id: 0,
        name: field.name,
        type: field.type,
        options: field.options,
        value: this.convertValueToString(field.value), // Ensure value is a string
        stepValueId: 0
      }))
    }))
  };
  console.log('Submission details:', submissionDetails);
      console.log('Submission details:', submissionDetails);  

      this.apiService.addSubmissionToProject(this.projectId!, submissionDetails).subscribe(
        response => {
          console.log('Submission added successfully:', response);
          this.snackBar.open('Submission added successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/dashboard']);
          // Handle success (e.g., redirect to project details page)
        },
        error => {
          console.error('Failed to add submission:', error);
          if (error.status === 400) {
            const validationErrors = error.error.errors;
            Object.keys(validationErrors).forEach(field => {
              const formControl = this.form?.steps.flatMap((step: Step) => step.fields).find(f => f.name === field);
              if (formControl) {
                formControl.error = validationErrors[field];
              }
            });
          }
          // Handle error
        }
      );
    }
  }
}
