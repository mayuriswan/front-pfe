import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  formId: number | undefined;
  form: any;
  currentStepIndex: number = 0;

  constructor(private route: ActivatedRoute, private apiService: AapApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formId = +params['id'];
      this.fetchEvaluationForm();
    });
  }

  fetchEvaluationForm(): void {
    if (this.formId) {
      this.apiService.getEvaluationFormById(this.formId).subscribe(
        (form: any) => {
          this.form = form;
          console.log('Evaluation form data:', this.form);
        },
        (error) => {
          console.error('Failed to fetch evaluation form:', error);
        }
      );
    }
  }

  getOptions(options: string): string[] {
    return options ? options.split(',').map(option => option.trim()) : [];
  }

  nextStep(): void {
    if (this.currentStepIndex < this.form.steps.length - 1) {
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
    return this.currentStepIndex === this.form.steps.length - 1;
  }
}