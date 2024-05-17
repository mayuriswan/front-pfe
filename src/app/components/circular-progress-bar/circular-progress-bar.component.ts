import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css']
})
export class CircularProgressBarComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() total: number = 100;
  
  circumference: number = 0; // Initialize circumference
  
  constructor() { }
  
  ngOnInit(): void {
    // Calculate the circumference of the circle based on the radius
    this.circumference = 2 * Math.PI * 50; // Assuming radius of 50
  }
  
  calculateDashOffset(): number {
    // Calculate the dash offset to show progress
    const progressFraction = this.progress / this.total;
    return this.circumference * (1 - progressFraction);
  }
}
