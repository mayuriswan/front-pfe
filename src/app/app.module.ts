import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



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
    ExempleAapPostulerComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AapApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

