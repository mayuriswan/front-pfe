import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Utilisation de HttpClientTestingModule pour les tests HTTP

import { FormCreateAapComponent } from './form-create-aap.component';
import { CountryService } from '../form-create-aap/country.service.';

describe('FormCreateAapComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormCreateAapComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule // Ajout de HttpClientTestingModule
      ],
      providers: [CountryService]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FormCreateAapComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
