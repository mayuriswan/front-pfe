import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UsersmanagerComponent } from './pages/usersmanager/usersmanager.component';
import { LanceraapComponent } from './pages/lanceraap/lanceraap.component';
import { PostulerComponent } from './pages/postuler/postuler.component';
import { ExempleAapComponent } from './components/exemple-aap/exemple-aap.component';
import { ExempleAapPostulerComponent } from './pages/exemple-aap-postuler/exemple-aap-postuler.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { ThematiqueComponent } from './pages/thematique/thematique.component';
import { LaboratoiresComponent } from './pages/laboratoires/laboratoires.component';
import { EvaluationProjectComponentComponent } from './components/evaluation-project-component/evaluation-project-component.component';
import { AuthGuard } from './auth.guard';
import { ProjectDetailsComponentComponent } from './components/project-details-component/project-details-component.component';
import { EvaluatorHomeComponent } from './components/evaluator-home/evaluator-home.component';
import { ResponsibleDashboardComponent } from './components/responsible-dashboard/responsible-dashboard.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersmanagerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'lanceraap', component: LanceraapComponent},
  { path: 'postuler', component: PostulerComponent},
  { path: 'exemple-aap-postuler', component:ExempleAapPostulerComponent },
  { path: 'exemple-aap/:id', component: ExempleAapComponent },
  { path: 'usersmanager', component:UsersmanagerComponent, canActivate: [AuthGuard]},
  { path: 'evaluation-form/:id', component: EvaluationFormComponent },
  { path: 'thematique', component:ThematiqueComponent },
  { path: 'laboratoires', component:LaboratoiresComponent },
  { path: 'evaluation-form/:id/:projectId', component: EvaluationProjectComponentComponent, canActivate: [AuthGuard] },
  { path: 'project-details/:id', component: ProjectDetailsComponentComponent },
  { path: 'responsible-home', component: ResponsibleDashboardComponent, canActivate: [AuthGuard] },


  { path: 'evaluator-home', component: EvaluatorHomeComponent , canActivate: [AuthGuard]},

  

  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

