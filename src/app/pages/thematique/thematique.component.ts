import { Component } from '@angular/core';

@Component({
  selector: 'app-thematique',
  templateUrl: './thematique.component.html',
  styleUrls: ['./thematique.component.css']
})
export class ThematiqueComponent {
    thematiques = [
      {
        title: "Énergies renouvelables",
        description: "Nouveaux développements technologiques, nouvelles applications visant l’intégration industrielle et sociale, nouvelles adaptations aux changements climatiques",
        icon: "fas fa-solar-panel"
      },
      {
        title: "Réseau électrique",
        description: "Intégration des énergies renouvelables dans le réseau électrique",
        icon: "fas fa-broadcast-tower"
      },
      {
        title: "Mobilité durable",
        description: "Route de demain, véhicule de demain, transformation du trafic routier en énergie, digitalisation",
        icon: "fas fa-car-alt"
      },
      {
        title: "Ville du futur",
        description: "Quartier de demain, gestion intelligente de l’énergie, réseaux intelligents",
        icon: "fas fa-city"
      },
      {
        title: "Stockage de l’énergie",
        description: "Nouvelles sources de stockage énergétique, nouveaux matériaux de stockage adaptés aux conditions climatiques extrêmes, nouvelles formes de stockage de l’énergie, nouveaux procédés de réduction du coût de stockage",
        icon: "fas fa-battery-full"
      },
      {
        title: "Efficacité énergétique",
        description: "Dans le bâtiment, l’agriculture, le transport et l’industrie",
        icon: "fas fa-leaf"
      },
      {
        title: "Nexus",
        description: "Eau / Energies renouvelables / Agriculture",
        icon: "fas fa-water"
      },
      {
        title: "Nouvelles énergies",
        description: "",
        icon: "fas fa-wind"
      },
      {
        title: "Industries et mines vertes",
        description: "",
        icon: "fas fa-industry"
      }
    ];

    constructor() {}

    ngOnInit(): void {}
  }