import { Component } from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent {
  themes = [
    { label: 'ÉNERGIES RENOUVELABLES', icon: 'fas fa-solar-panel' },
    { label: 'EFFICACITÉ ÉNERGÉTIQUE', icon: 'fas fa-leaf' },
    { label: 'RÉSEAU ÉLECTRIQUE', icon: 'fas fa-broadcast-tower' },
    { label: 'NEXUS EAU-ÉNERGIE', icon: 'fas fa-water' },
    { label: 'MOBILITÉ DURABLE', icon: 'fas fa-car-alt' },
    { label: 'STOCKAGE DE L\'ÉNERGIE', icon: 'fas fa-battery-full' },
    { label: 'VILLE DU FUTUR', icon: 'fas fa-city' },
    { label: 'INDUSTRIES ET MINES VERTES', icon: 'fas fa-industry' },
    { label: 'NOUVELLES ÉNERGIES', icon: 'fas fa-wind' }
  ];
}
