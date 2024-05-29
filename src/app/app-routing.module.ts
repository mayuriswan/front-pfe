import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AuthGuard } from './auth.guard'; 
import { UsersmanagerComponent } from './pages/usersmanager/usersmanager.component';
import { LanceraapComponent } from './pages/lanceraap/lanceraap.component';
import { PostulerComponent } from './pages/postuler/postuler.component';
import { ExempleAapComponent } from './components/exemple-aap/exemple-aap.component';
import { ExempleAapPostulerComponent } from './pages/exemple-aap-postuler/exemple-aap-postuler.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersmanagerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'lanceraap', component: LanceraapComponent, canActivate: [AuthGuard]},
  { path: 'postuler', component: PostulerComponent},
  { path: 'exemple-aap-postuler', component:ExempleAapPostulerComponent },
  { path: 'usersmanager', component:UsersmanagerComponent, canActivate: [AuthGuard]},



  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

