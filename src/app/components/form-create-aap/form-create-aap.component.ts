import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CountryService } from '../form-create-aap/country.service.';

@Component({
  selector: 'app-form-create-aap',
  templateUrl: './form-create-aap.component.html',
  styleUrls: ['./form-create-aap.component.css']
})
export class FormCreateAapComponent implements OnInit {
  activeTab: string = 'evaluation';
  customForm!: FormGroup; // Utilisation de l'affirmation non-null !
  countries: any[] = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder, private countryService: CountryService) { }

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
      Pays_autorises: [[], Validators.required], // Utilisation de FormControl pour la sélection multiple
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
          item_id: country.cca3, // Utilisation d'un code unique
          item_text: country.name.common
        })).sort((a: any, b: any) => a.item_text.localeCompare(b.item_text));
      },
      (error: any) => {
        console.error('Error loading countries', error);
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
      // Here, you can make an HTTP request to submit the form data to your backend
      // Example: this.http.post('your-api-endpoint', formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
    }
  }
}
