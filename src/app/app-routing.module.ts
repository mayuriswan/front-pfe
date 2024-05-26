import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';
<<<<<<< HEAD
import { PostulerComponent } from './pages/postuler/postuler.component';

=======
import { AuthGuard } from './auth.guard'; 
import { UsersmanagerComponent } from './pages/usersmanager/usersmanager.component';
>>>>>>> a10a9546aca06f078aaa63ae68a6ffd6cf024aa9
const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersmanagerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'profile', component: ProfilComponent },
  { path: 'home', component: HomeComponent },
  { path: 'postuler', component: PostulerComponent }
=======
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/accueil' }
>>>>>>> a10a9546aca06f078aaa63ae68a6ffd6cf024aa9
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

