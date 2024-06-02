import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormulaireComponent } from '../formulaire/formulaire.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @ViewChild(FormulaireComponent) formulaireComponent!: FormulaireComponent;
  @Output() formCreated = new EventEmitter<any>();
  modalOpen = false;

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  submitForm() {
    const formValue = this.formulaireComponent.formulaireForm.value;
    this.formCreated.emit(formValue); // Emit the created form
    this.closeModal();
  }
}
