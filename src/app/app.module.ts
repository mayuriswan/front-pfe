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
    CircularProgressBarComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
