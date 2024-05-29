import { Component } from '@angular/core';

@Component({
  selector: 'app-lanceraap',
  templateUrl: './lanceraap.component.html',
  styleUrls: ['./lanceraap.component.css']
})
export class LanceraapComponent {
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