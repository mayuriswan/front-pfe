import { ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormCreateAapComponent } from './form-create-aap.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from 'src/app/countries.service';
import { TestBed, async } from '@angular/core/testing';

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
      providers: [CountriesService]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FormCreateAapComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});