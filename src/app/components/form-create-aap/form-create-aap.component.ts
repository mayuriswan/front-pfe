import { Component } from '@angular/core';

@Component({
  selector: 'app-form-create-aap',
  templateUrl: './form-create-aap.component.html',
  styleUrls: ['./form-create-aap.component.css']
})
export class FormCreateAapComponent {
  activeTab: string = 'evaluation';

  criteria = [
    { title: '', score: null },
    { title: '', score: null }
  ];

  setActiveTab(event: Event, tab: string) {
    event.preventDefault();
    this.activeTab = tab;
  }

  addCriterion(event: Event): void {
    event.preventDefault();
    this.criteria.push({ title: '', score: null });
  }
}