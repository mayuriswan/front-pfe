import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: any[] = [];
  currentSlide = 0;
  slideInterval: any;

  constructor(private aapApiService: AapApiService) {}

  ngOnInit() {
    this.fetchProjects();
    this.startSlideShow();
  }

  fetchProjects() {
    this.aapApiService.getProjects().subscribe(
      (projects: any[]) => {
        this.slides = projects
          .filter(project => project.isPublic)
          .map(project => ({
            id: project.id,
            title: project.name,
            description: project.description,
            image: '/assets/Images/solaire1.jpg'
          }));
        
        // Ensure at least one image is present
        if (this.slides.length === 0) {
          this.slides.push({
            id: 'default',
            title: 'Default Project',
            description: 'This is a default project description',
            image: '/assets/Images/solaire1.jpg'
          });
        }
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
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
