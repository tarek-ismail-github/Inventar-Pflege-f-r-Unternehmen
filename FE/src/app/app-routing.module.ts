import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeploymentComponent } from './components/Deployment/Deployment.component';
import { ProjectComponent } from './components/Project/Project.component';
import { ServerComponent } from './components/Server/Server.component';
import { PratikumsteilnehemerComponent } from './components/pratikumsteilnehemer/pratikumsteilnehemer.component';
import {CreateAssetTypeComponent} from './components/create-asset-type/create-asset-type.component';
import { ExchangePortalComponent } from './components/exchange-portal/exchange-portal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { LoginComponent } from './components/Login/Login.component';
import { AuthGuard } from './guard/auth.guard';
import { UserComponentFactory } from 'ag-grid-community';
import { AdminUserComponent } from './components/administration/admin-user/admin-user.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'login/registrieren', component: RegisterComponent },
  {path:'deployment', component:DeploymentComponent},
  {path:'project', component:ProjectComponent},
  {path:'user', component:AdminUserComponent},
  {path:'server', component:ServerComponent},
  {path:'praktikumsteilnehmer', component:PratikumsteilnehemerComponent},
  {path:'newAssetType', component:CreateAssetTypeComponent},
  { path: 'austausch', component: ExchangePortalComponent, runGuardsAndResolvers: 'always' },
  { path: '**', component: PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DeploymentComponent,ProjectComponent,ServerComponent, PratikumsteilnehemerComponent]
