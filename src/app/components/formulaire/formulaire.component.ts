import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormService } from '../../services/services/form.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaireComponent implements OnInit {
  formulaireForm: FormGroup;
  currentStep = 0;

  constructor(private fb: FormBuilder, private formService: FormService, private cd: ChangeDetectorRef) {
    this.formulaireForm = this.fb.group({
      nom: ['', Validators.required],
      steps: this.fb.array([])
    });
  }

  ngOnInit() {
    // Initialisation sans ajout automatique d'étape
  }

  get steps(): FormArray {
    return this.formulaireForm.get('steps') as FormArray;
  }

  addStep() {
    const step = this.fb.group({
      title: ['', Validators.required],
      fields: this.fb.array([]),
      expanded: [true]
    });

    this.steps.push(step);
    this.currentStep = this.steps.length - 1; // Sélectionner automatiquement la nouvelle étape

    // Forcer la détection des changements pour une mise à jour immédiate
    this.cd.detectChanges();
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
    if (this.currentStep >= this.steps.length) {
      this.currentStep = this.steps.length - 1;
    }
    this.cd.detectChanges();
  }

  selectStep(index: number) {
    this.currentStep = index;
    this.cd.detectChanges();
  }

  onStepChange(event: any) {
    this.currentStep = event.selectedIndex;
    this.cd.detectChanges();
  }

  getFields(stepIndex: number): FormArray {
    return this.steps.at(stepIndex).get('fields') as FormArray;
  }

  addField(stepIndex: number, type: string) {
    const fields = this.getFields(stepIndex);
    const field = this.fb.group({
      title: ['', Validators.required],
      type: [type],
      value: ['']
    });

    if (type === 'choice') {
      (field as FormGroup).addControl('choices', this.fb.array([this.fb.control('')]));
    }

    fields.push(field);
    this.cd.detectChanges();
  }

  removeField(stepIndex: number, fieldIndex: number) {
    this.getFields(stepIndex).removeAt(fieldIndex);
    this.cd.detectChanges();
  }

  getChoices(stepIndex: number, fieldIndex: number): FormArray {
    return this.getFields(stepIndex).at(fieldIndex).get('choices') as FormArray;
  }

  addChoice(stepIndex: number, fieldIndex: number) {
    this.getChoices(stepIndex, fieldIndex).push(this.fb.control(''));
    this.cd.detectChanges();
  }

  removeChoice(stepIndex: number, fieldIndex: number, choiceIndex: number) {
    this.getChoices(stepIndex, fieldIndex).removeAt(choiceIndex);
    this.cd.detectChanges();
  }

  onSubmit() {
    if (this.formulaireForm.valid) {
      this.formService.saveForm(this.formulaireForm.value).subscribe(
        (response: any) => {
          console.log('Form saved successfully', response);
        },
        (error: any) => {
          console.error('Error saving form', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}