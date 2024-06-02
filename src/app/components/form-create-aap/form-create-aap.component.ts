import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CountryService } from '../form-create-aap/country.service.';
import { ModalComponent } from '../modal/modal.component';
import { FormService } from '../../services/services/form.service';
import { Formulaire } from '../../models/formulaire.model';

@Component({
  selector: 'app-form-create-aap',
  templateUrl: './form-create-aap.component.html',
  styleUrls: ['./form-create-aap.component.css']
})
export class FormCreateAapComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  activeTab: string = 'evaluation';
  customForm!: FormGroup;
  countries: any[] = [];
  dropdownSettings = {};
  evaluationForms: Formulaire[] = [];

  constructor(private fb: FormBuilder, private countryService: CountryService, private formService: FormService) { }

  ngOnInit(): void {
    this.customForm = this.fb.group({
      Nom: ['', Validators.required],
      Description: ['', Validators.required],
      responsable: ['', Validators.required],
      Category: ['', Validators.required],
      institut_hote: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      duree_minimale: [1, [Validators.required, Validators.min(1)]],
      duree_maximale: [1, [Validators.required, Validators.min(1)]],
      Task_type: [''],
      Pays_autorises: [[], Validators.required],
      Budget_separe: [false],
      Post_budget: ['', Validators.required],
      Date_publication: ['', Validators.required],
      Date_cloture: ['', Validators.required],
      Soumission_acceptee: [0],
      Formulaire_evaluation: ['', Validators.required],
      Documents: [''],
      criteria: this.fb.array(this.initCriteria())
    });

    this.loadCountries();
    this.loadEvaluationForms();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initCriteria() {
    return [
      this.fb.group({ title: ['', Validators.required], score: [null, [Validators.required, Validators.min(0), Validators.max(100)]] }),
      this.fb.group({ title: ['', Validators.required], score: [null, [Validators.required, Validators.min(0), Validators.max(100)]] })
    ];
  }

  get criteria(): FormArray {
    return this.customForm.get('criteria') as FormArray;
  }

  addCriterion(event: Event): void {
    event.preventDefault();
    this.criteria.push(this.fb.group({ title: ['', Validators.required], score: [null, [Validators.required, Validators.min(0), Validators.max(100)]] }));
  }

  setActiveTab(event: Event, tab: string) {
    event.preventDefault();
    this.activeTab = tab;
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (data: any) => {
        this.countries = data.map((country: any) => ({
          item_id: country.cca3,
          item_text: country.name.common
        })).sort((a: any, b: any) => a.item_text.localeCompare(b.item_text));
      },
      (error: any) => {
        console.error('Error loading countries', error);
      }
    );
  }


  loadEvaluationForms(): void {
    this.formService.getFormulaires().subscribe(
      (data: Formulaire[]) => {
        this.evaluationForms = data;
      },
      (error: any) => {
        console.error('Error loading evaluation forms', error);
      }
    );
  }

  openModal(): void {
    this.modalComponent.openModal();
  }

  closeModal(): void {
    this.modalComponent.closeModal();
  }

  onFormCreated(form: Formulaire): void {
    this.formService.saveForm(form).subscribe(
      (response: Formulaire) => {
        console.log('Formulaire enregistré avec succès', response);
        // Ajouter le nouveau formulaire à la liste des formulaires d'évaluation disponibles
        this.evaluationForms.push(response);
        this.customForm.get('Formulaire_evaluation')?.setValue(response.id);
      },
      (error: any) => {
        console.error('Erreur lors de l\'enregistrement du formulaire', error);
      }
    );
  }

  onSubmit(): void {
    if (this.customForm.valid) {
      const formData = {
        ...this.customForm.value,
        Pays_autorises: this.customForm.value.Pays_autorises.map((country: any) => country.item_text)
      };
      console.log(formData);
      // Utilisez la méthode submitForm de FormService pour soumettre les données du formulaire
      this.formService.submitForm(formData).subscribe(response => {
        console.log('Formulaire soumis avec succès', response);
        this.loadEvaluationForms();
      }, error => {
        console.error('Erreur lors de la soumission du formulaire', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}