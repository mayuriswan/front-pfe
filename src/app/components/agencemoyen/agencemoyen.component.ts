import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agencemoyen',
  templateUrl: './agencemoyen.component.html',
  styleUrls: ['./agencemoyen.component.css']
})
export class AgencemoyenComponent implements OnInit {

  stats: Array<{ number: number, title: string, description: string }> = [];

  constructor() { }

  ngOnInit(): void {
    this.stats = [
      { number: 14, title: 'Appels à projet', description: 'dans le solaire thermique, l\'éolien, le photovoltaïque et les autres domaines des énergies renouvelables' },
      { number: 60, title: 'Projets innovants', description: 'en cours de réalisation dans plusieurs domaines des énergies renouvelables' },
      { number: 185, title: 'Millions de MAD', description: 'dédiés au financement des appels à projets à date d\'aujourd\'hui' },
      { number: 801, title: 'Chercheurs', description: 'entre professeurs, doctorants et étudiants soutenus par l\'IRESEN' }
    ];
  }

}
