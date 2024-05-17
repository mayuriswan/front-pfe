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
      title: 'Titre 2',
      description: 'kffklfkg',
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
