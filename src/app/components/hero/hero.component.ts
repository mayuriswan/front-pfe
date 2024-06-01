import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides = [
    {
      title: 'Institut de Recherche en Energie Solaire et Energies Nouvelles',
      description: 'Accompagnement et Développement de la Recherche Appliquée et de l’Innovation au service de la Transition Énergétique Nationale et Continentale.',
      image: '/assets/Images/hero.jpg'
    },
    {
      title: 'Institut de Recherche en Energie Solaire et Energies Nouvelles',
      description: 'Nos projets de recherche collaboratifs à l’échelle nationale et internationale nous permettent non seulement de favoriser et faciliter la collaboration entre les chercheurs et les experts mais aussi «d’innover ensemble pour contribuer à la lutte contre le changement climatique et la précarité énergétique en Afrique.»',
      image: '/assets/Images/hero.jpg'
    }
  ];

  currentSlide = 0;
  slideInterval: any;

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    this.clearSlideShowInterval();
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  }

  clearSlideShowInterval() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.clearSlideShowInterval();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.startSlideShow();
  }
}
