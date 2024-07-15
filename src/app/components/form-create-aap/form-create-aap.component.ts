import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AapApiService } from 'src/app/services/aap-api.service';
import { CountriesService } from 'src/app/countries.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-create-aap',
  templateUrl: './form-create-aap.component.html',
  styleUrls: ['./form-create-aap.component.css']
})
export class FormCreateAapComponent implements OnInit {
  allEvaluators: any[] = [];
  allUsers: any[] = [];
  projectForm: FormGroup;
  countries: string[] = [];
  filteredCountries: string[] = [];
  allCountriesSelected: boolean = false;
  categories = ['R&D', 'Innovations'];
  institutions: { id: number, name: string }[] = [];
  newInstitutionForm: FormGroup;
  newTasktypesForm: FormGroup;
  taskTypes: { id: number, name: string }[] = [];
  isModalOpen = false;
  TaskTypeModalOpen = false;
  isEvaluationFormModalOpen = false;
  isNewEvaluationFormModalOpen = false;
  newEvaluationForm: FormGroup;
  evaluationForms: any[] = [];
  evaluations: any[] = [];
  projectAttributes = ['Name', 'Description', 'Category', 'Budget', 'MinDuration', 'MaxDuration', 'PostBudget', 'AcceptedSubmissions'];
  newEvalForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private apiService: AapApiService,
    private snackBar: MatSnackBar // Optional for notifications
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      hostingInstitution: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      minDuration: [1, [Validators.required, Validators.min(1)]],
      maxDuration: [2, [Validators.required, Validators.min(1)]],
      taskType: ['', Validators.required],
      authorizedCountries: [[], Validators.required],
      separateBudget: [false],
      postBudget: [0, [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      acceptedSubmissions: [0, [Validators.required, Validators.min(0)]],
      evaluationForm: ['', Validators.required],
      evaluation: ['', Validators.required], // Adding evaluation field
      document: [null],
      photo: [null],
      evaluators: [[], Validators.required]
    }, { validator: this.minLessThanMax('minDuration', 'maxDuration') });

    this.newEvaluationForm = this.fb.group({
      name: ['', Validators.required],
      steps: this.fb.array([])
    });

    this.newInstitutionForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.newTasktypesForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.newEvalForm = this.fb.group({
      title: ['', Validators.required],
      baseDeNotation: [0, [Validators.required, Validators.min(0)]],
      criteria: this.fb.array([])
    });
  }
  get criteria() {
    return this.newEvalForm.get('criteria') as FormArray;
  }

  addCriterion() {
    this.criteria.push(this.fb.group({
      criterion: ['', Validators.required],
      note: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeCriterion(index: number) {
    this.criteria.removeAt(index);
  }




  minLessThanMax(minKey: string, maxKey: string) {
    return (group: FormGroup) => {
      const min = group.controls[minKey];
      const max = group.controls[maxKey];
      if (min.value >= max.value) {
        return max.setErrors({ minLessThanMax: true });
      } else {
        return max.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries.filter(country => country !== 'Western Sahara');
      this.filteredCountries = this.countries;
    });

    this.apiService.getHostinginstitutionsList().subscribe((data: any[]) => {
      this.institutions = data;
    });

    this.apiService.getTasktypesList().subscribe((data: any[]) => {
      this.taskTypes = data;
    });

    this.fetchEvaluationForms();
    this.fetchEvaluations();
    this.loadPeople();
    this.loadInstitutions();
    this.loadTasktypes();
    this.loadEvaluators();
  }

  fetchEvaluationForms(): void {
    this.apiService.getEvaluationForms().subscribe(
      (forms: any[]) => {
        this.evaluationForms = forms;
      },
      (error) => {
        console.error('Failed to fetch evaluation forms:', error);
      }
    );
  }

  fetchEvaluations(): void {
    this.apiService.getEvaluations().subscribe(
      (evaluations: any[]) => {
        this.evaluations = evaluations;
        console.log('Evaluations:', this.evaluations);
      },
      (error) => {
        console.error('Failed to fetch evaluations:', error);
      }
    );
  }

  loadInstitutions() {
    this.apiService.getHostinginstitutionsList().subscribe(
      data => this.institutions = data,
      error => console.error('Error loading institutions', error)
    );
  }

  loadTasktypes() {
    this.apiService.getTasktypesList().subscribe(
      data => this.taskTypes = data,
      error => console.error('Error loading task types', error)
    );
  }

  loadPeople(): void {
    this.apiService.getUserList().subscribe(users => {
      this.allUsers = users.map(user => ({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      }));
    });
  }

  loadEvaluators(): void {
    this.apiService.getUserList().subscribe(users => {
      this.allEvaluators = users
        .filter(user => user.role === 0)
        .map(user => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          selected: false
        }));
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = new FormData();
      formData.append('name', this.projectForm.get('name')?.value);
      formData.append('description', this.projectForm.get('description')?.value);
      formData.append('category', this.projectForm.get('category')?.value);
      formData.append('responsiblePersonId', this.projectForm.get('responsiblePerson')?.value);
      formData.append('hostingInstitutionId', this.projectForm.get('hostingInstitution')?.value);
      formData.append('budget', this.projectForm.get('budget')?.value);
      formData.append('minDuration', this.projectForm.get('minDuration')?.value);
      formData.append('maxDuration', this.projectForm.get('maxDuration')?.value);
      formData.append('taskTypeId', this.projectForm.get('taskType')?.value);
      formData.append('separateBudget', this.projectForm.get('separateBudget')?.value);
      formData.append('postBudget', this.projectForm.get('postBudget')?.value);

      const authorizedCountries = this.projectForm.get('authorizedCountries')?.value;
      if (authorizedCountries && authorizedCountries.length > 0) {
        authorizedCountries.forEach((country: string) => {
          formData.append('authorizedCountries', country);
        });
      }

      formData.append('publicationDate', this.formatDate(this.projectForm.get('publicationDate')?.value));
      formData.append('closingDate', this.formatDate(this.projectForm.get('closingDate')?.value));
      formData.append('acceptedSubmissions', this.projectForm.get('acceptedSubmissions')?.value);
      formData.append('evaluationFormId', this.projectForm.get('evaluationForm')?.value);
      formData.append('evaluationId', this.projectForm.get('evaluation')?.value); // Adding evaluationId

      const document = this.projectForm.get('document')?.value;
      if (document) {
        formData.append('document', document, document.name);
      }

      const photo = this.projectForm.get('photo')?.value;
      if (photo) {
        formData.append('photo', photo, photo.name);
      }

      const evaluators = this.projectForm.get('evaluators')?.value.map((evaluator: any) => {
        console.log('Evaluator:', evaluator);
        return evaluator;
      });
          //can ypu make this evalutors from [["2"]] to [2]*
          console.log('Evaluators:', evaluators);
          if (evaluators && evaluators.length > 0) {
            evaluators.forEach((evalutor: number) => {
              formData.append('evaluators', evalutor.toString());
            });
          }
    // if (evaluators && evaluators.length > 0) {
    //   formData.append('evaluators', JSON.stringify(evaluators)); // Convert to JSON string
    // }
    
    //can you condole the data sent ?
      console.log('Form data:', formData.getAll('evaluators'));

     
      this.apiService.createProject(formData).subscribe(
        (createdProject: any) => {
          console.log('Project created successfully:', createdProject);
          this.snackBar.open('Project saved successfully', 'Close', { duration: 3000 });
          this.resetForm();
        },
        (error) => {
          console.error('Failed to create project:', error);
          this.snackBar.open('Failed to create project', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.error('Form is invalid');
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  onSaveAsDraft() {
    if (this.projectForm.valid) {
      const formData = new FormData();
      formData.append('name', this.projectForm.get('name')?.value);
      formData.append('description', this.projectForm.get('description')?.value);
      formData.append('category', this.projectForm.get('category')?.value);
      formData.append('responsiblePersonId', this.projectForm.get('responsiblePerson')?.value);
      formData.append('hostingInstitutionId', this.projectForm.get('hostingInstitution')?.value);
      formData.append('budget', this.projectForm.get('budget')?.value);
      formData.append('minDuration', this.projectForm.get('minDuration')?.value);
      formData.append('maxDuration', this.projectForm.get('maxDuration')?.value);
      formData.append('taskTypeId', this.projectForm.get('taskType')?.value);
      formData.append('separateBudget', this.projectForm.get('separateBudget')?.value);
      formData.append('postBudget', this.projectForm.get('postBudget')?.value);

      const authorizedCountries = this.projectForm.get('authorizedCountries')?.value;
      if (authorizedCountries && authorizedCountries.length > 0) {
        authorizedCountries.forEach((country: string) => {
          formData.append('authorizedCountries', country);
        });
      }

      formData.append('publicationDate', this.formatDate(this.projectForm.get('publicationDate')?.value));
      formData.append('closingDate', this.formatDate(this.projectForm.get('closingDate')?.value));
      formData.append('acceptedSubmissions', this.projectForm.get('acceptedSubmissions')?.value);
      formData.append('evaluationFormId', this.projectForm.get('evaluationForm')?.value);
      formData.append('evaluationId', this.projectForm.get('evaluation')?.value); // Adding evaluationId

      const document = this.projectForm.get('document')?.value;
      if (document) {
        formData.append('document', document, document.name);
      }

      const photo = this.projectForm.get('photo')?.value;
      if (photo) {
        formData.append('photo', photo, photo.name);
      }

      formData.append('isDraft', 'true');

      this.apiService.createProject(formData).subscribe(
        (createdProject: any) => {
          console.log('Draft created successfully:', createdProject);
          this.snackBar.open('Draft saved successfully', 'Close', { duration: 3000 });
          this.resetForm();
        },
        (error) => {
          console.error('Failed to create project:', error);
          this.snackBar.open('Failed to create project', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.error('Form is invalid');
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  resetForm(): void {
    this.projectForm.reset();
  }

  formatDate(date: Date): string {
    if (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  onFileSelected(event: any, controlName: string) {
    const file = event.target.files[0];
    this.projectForm.patchValue({
      [controlName]: file
    });
  }

  onSearchCountry(event: any): void {
    const searchValue = event.target.value.toLowerCase();
    this.filteredCountries = this.countries.filter(country => country.toLowerCase().includes(searchValue));
  }

  toggleSelectAllCountries(): void {
    const authorizedCountriesControl = this.projectForm.get('authorizedCountries');
    if (this.allCountriesSelected) {
      authorizedCountriesControl?.setValue([]);
    } else {
      authorizedCountriesControl?.setValue(this.countries);
    }
    this.allCountriesSelected = !this.allCountriesSelected;
  }

  openAddInstitutionModal() {
    this.isModalOpen = true;
  }

  closeAddInstitutionModal() {
    this.isModalOpen = false;
  }

  onAddInstitution() {
    if (this.newInstitutionForm.valid) {
      const institution = this.newInstitutionForm.value;
      this.apiService.addInstitution(institution).subscribe(
        response => {
          this.snackBar.open('Institution added successfully', 'Close', { duration: 3000 });
          this.loadInstitutions();
          this.closeAddInstitutionModal();
        },
        error => {
          this.snackBar.open('Failed to add institution', 'Close', { duration: 3000 });
        }
      );
    }
  }

  openAddTaskTypeModal() {
    this.TaskTypeModalOpen = true;
  }

  closeAddTaskTypeModal() {
    this.TaskTypeModalOpen = false;
  }

  onAddTasktypes() {
    if (this.newTasktypesForm.valid) {
      const taskType = this.newTasktypesForm.value;
      this.apiService.addTasktypes(taskType).subscribe(
        response => {
          this.snackBar.open('Task type added successfully', 'Close', { duration: 3000 });
          this.loadTasktypes();
          this.closeAddTaskTypeModal();
        },
        error => {
          this.snackBar.open('Failed to add task type', 'Close', { duration: 3000 });
        }
      );
    }
  }

  removeInstitution(id: number, event: Event) {
    event.stopPropagation(); // Prevent the dropdown from closing
    if (confirm('Are you sure you want to delete this institution?')) {
      this.apiService.deleteInstitution(id).subscribe(() => {
        this.snackBar.open('Institution deleted successfully', 'Close', { duration: 2000 });
        this.loadInstitutions(); // Refresh the list
      }, error => {
        this.snackBar.open('Failed to delete institution', 'Close', { duration: 2000 });
      });
    }
  }

  removeTaskType(id: number, event: Event) {
    event.stopPropagation(); // Prevent the dropdown from closing
    if (confirm('Are you sure you want to delete this task type?')) {
      this.apiService.deleteTasktypes(id).subscribe(() => {
        this.snackBar.open('Task type deleted successfully', 'Close', { duration: 2000 });
        this.loadTasktypes(); // Refresh the list
      }, error => {
        this.snackBar.open('Failed to delete Task type', 'Close', { duration: 2000 });
      });
    }
  }

  openAddEvaluationFormModal() {
    this.isEvaluationFormModalOpen = true;
  }

  closeAddEvaluationFormModal() {
    this.isEvaluationFormModalOpen = false;
  }
  isEvaluatorsModalOpen = false;

  openEvaluatorsModal() {
    this.isEvaluatorsModalOpen = true;
  }
  
  closeEvaluatorsModal() {
    this.isEvaluatorsModalOpen = false;
  }
  
  saveSelectedEvaluators() {
    const selectedEvaluators = this.allEvaluators.filter(evaluator => evaluator.selected);
    //map selected evaluators to project evaluators 
    this.projectForm.get('evaluators')?.setValue(selectedEvaluators.map(evaluator => evaluator.id));
    console.log('Selected evaluators:', selectedEvaluators);
    this.closeEvaluatorsModal();
  }
  onAddEvaluationForm(): void {
    if (this.newEvaluationForm.valid) {
      const evaluationForm = this.newEvaluationForm.value;
      this.apiService.createEvaluationForm(evaluationForm).subscribe(
        (createdForm: any) => {
          console.log('Evaluation form created successfully:', createdForm);
          this.closeAddEvaluationFormModal();
          this.newEvaluationForm.reset();
          this.fetchEvaluationForms(); // Refresh the evaluation forms list
        },
        (error) => {
          console.error('Failed to create evaluation form:', error);
        }
      );
    }
  }

  openAddNewEvaluationModal() {
    this.isNewEvaluationFormModalOpen = true;
  }

  closeNewEvaluationFormModal() {
    this.isNewEvaluationFormModalOpen = false;
  }

  onAddNewEvaluation(): void {
    if (this.newEvalForm.valid) {
      const evaluation = this.newEvalForm.value;
      this.apiService.createEvaluation(evaluation).subscribe(
        (createdEvaluation: any) => {
          console.log('Evaluation created successfully:', createdEvaluation);
          this.closeNewEvaluationFormModal();
          this.newEvaluationForm.reset();
          this.fetchEvaluations(); // Refresh the evaluations list
        },
        (error) => {
          console.error('Failed to create evaluation:', error);
        } 
      );
    }
  }

  get formSteps() {
    return this.newEvaluationForm.get('steps') as FormArray;
  }

  getStepFields(stepIndex: number) {
    return this.formSteps.at(stepIndex).get('fields') as FormArray;
  }

  addStep() {
    this.formSteps.push(this.fb.group({
      name: ['', Validators.required],
      fields: this.fb.array([])
    }));
  }

  removeStep(index: number) {
    this.formSteps.removeAt(index);
  }

  addField(stepIndex: number) {
    this.getStepFields(stepIndex).push(this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      options: ['']
    }));
  }

  removeField(stepIndex: number, fieldIndex: number) {
    this.getStepFields(stepIndex).removeAt(fieldIndex);
  }

  openEvaluationForm(form: any, event: Event) {
    event.stopPropagation();
    const formUrl = `/evaluation-form/${form.id}`;
    window.open(formUrl, '_blank');
  }
  openEvaluation(evaluation: any, event: Event) {
  event.stopPropagation();
  const evaluationUrl = `/evaluation/${evaluation.id}`;
  window.open(evaluationUrl, '_blank');
}


}
