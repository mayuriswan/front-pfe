import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; // Ajout du module
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule, DatePipe } from '@angular/common'; // Add this line



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { MiddleComponent } from './components/middle/middle.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfilComponent } from './pages/profil/profil.component';
import { FormsModule } from '@angular/forms';
import { AapComponent } from './components/aap/aap.component';
import { CircularProgressBarComponent } from './components/circular-progress-bar/circular-progress-bar.component';
import { AapApiService } from './services/aap-api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { UsersmanagerComponent } from './pages/usersmanager/usersmanager.component';
import { UsersComponent } from './components/users/users.component';
import { ShowUserComponent } from './components/users/show-user/show-user.component';
import { AddEditUsersComponent } from './components/users/add-edit-users/add-edit-users.component';
import { LanceraapComponent } from './pages/lanceraap/lanceraap.component';
import { FormCreateAapComponent } from './components/form-create-aap/form-create-aap.component';
import { CompoPostulerComponent } from './components/compo-postuler/compo-postuler.component';
import { PostulerComponent } from './pages/postuler/postuler.component';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { ExempleAapComponent } from './components/exemple-aap/exemple-aap.component';
import { ExempleAapPostulerComponent } from './pages/exemple-aap-postuler/exemple-aap-postuler.component';
import { FormService } from './services/services/form.service';
import { ThemesComponent } from './components/themes/themes.component';
import { AgencemoyenComponent } from './components/agencemoyen/agencemoyen.component';
import { CompoThematiquesComponent } from './components/compo-thematiques/compo-thematiques.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { ModalComponent } from './components/modal/modal.component';



import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CountriesService } from './countries.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { ThematiqueComponent } from './pages/thematique/thematique.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { LaboComponent } from './components/labo/labo.component';
import { LaboratoiresComponent } from './pages/laboratoires/laboratoires.component';
import { EvaluationProjectComponentComponent } from './components/evaluation-project-component/evaluation-project-component.component';
import { ProjectDetailsComponentComponent } from './components/project-details-component/project-details-component.component';
import { EvaluatorHomeComponent } from './components/evaluator-home/evaluator-home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    MiddleComponent,
    ContactFormComponent,
    FooterComponent,
    HomeComponent,
    LoginFormComponent,
    LoginComponent,
    AccueilComponent,
    UserinfoComponent,
    SidebarComponent,
    ProfilComponent,
    AapComponent,
    CircularProgressBarComponent,
    UsersmanagerComponent,
    UsersComponent,
    ShowUserComponent,
    AddEditUsersComponent,
    LanceraapComponent,
    FormCreateAapComponent,
    CompoPostulerComponent,
    PostulerComponent,
    HeaderInfoComponent,
    ExempleAapComponent,
    ExempleAapPostulerComponent,
    ThemesComponent,
    AgencemoyenComponent,
    CompoThematiquesComponent,
    FormulaireComponent,
    ModalComponent,ExempleAapComponent,
    ExempleAapPostulerComponent,
    ThemesComponent,
    AgencemoyenComponent,
    CompoThematiquesComponent,
    FormulaireComponent,
    ModalComponent,
    EvaluationFormComponent,
    ThematiqueComponent,
    ChatbotComponent,
    LaboComponent,
    LaboratoiresComponent,
    EvaluationProjectComponentComponent,
    ProjectDetailsComponentComponent,
    EvaluatorHomeComponent
    
    
    
  ],
  imports: [
    CommonModule, // Add this line

    MatAutocompleteModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSnackBarModule // Añadir esta línea
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    AapApiService,
    FormService,
    CountriesService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }