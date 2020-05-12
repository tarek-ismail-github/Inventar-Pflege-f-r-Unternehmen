import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { DeploymentService } from './services/deployment.service';
import { BrowserModule } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import { NgModule,LOCALE_ID } from '@angular/core';
import { AppRoutingModule ,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {FileUploadModule} from 'ng2-file-upload';

import {
   MatMenuModule,
   MatIconModule,MatFormFieldModule, MatInputModule,MatDatepickerModule} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
//import {FileUploadModule} from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { PratikumsteilnehemerComponent } from './components/pratikumsteilnehemer/pratikumsteilnehemer.component';
import { ServerService } from './services/server.service';
import { PraktikumsteilnehmerService } from './services/praktikumsteilnehmer.service';
import { DeploymentComponent } from './components/Deployment/Deployment.component';
import { TeilnehmerDialogComponent } from './dialogs/teilnehmer-dialog/teilnehmer-dialog.component';
import { from } from 'rxjs';
import { ProjectService } from './services/project.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { CreateAssetTypeComponent } from './components/create-asset-type/create-asset-type.component';
import { TabellenService } from './services/tabellen.service';
import { AssestTypeDialogComponent } from './dialogs/assest-type-dialog/assest-type-dialog.component';
import { ExchangeDialogComponent } from './dialogs/exchange-dialog/exchange-dialog.component';
import { ExchangeService } from './services/exchange.service';
import { ExchangePortalComponent } from './components/exchange-portal/exchange-portal.component';
import { ServerDialogComponent } from './dialogs/server-dialog/server-dialog.component';
import { DeploymentDialogComponent } from './dialogs/deployment-dialog/deployment-dialog.component';
import { ProjectDialogComponent } from './dialogs/project-dialog/project-dialog.component';
import { ProjectComponent } from './components/Project/Project.component';
import { ProjectDeleteDialogComponent } from './dialogs/project-delete-dialog/project-delete-dialog.component';
import { LoginComponent } from './components/Login/Login.component';
import { AdminUserComponent } from './components/administration/admin-user/admin-user.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AssestDeleteDialogComponent } from './dialogs/assest-delete-dialog/assest-delete-dialog.component';
import { ServerEditDialogComponent } from './dialogs/server-edit-dialog/server-edit-dialog.component';
import { AssestTypeService } from './services/assest-type.service';



@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      HeaderComponent,
      PratikumsteilnehemerComponent,
      DeploymentComponent,
      TeilnehmerDialogComponent,
      PageNotFoundComponent,
      CreateAssetTypeComponent,
      AssestTypeDialogComponent,
      ExchangeDialogComponent,
      ExchangePortalComponent,
      ServerDialogComponent,
      DeploymentDialogComponent,
      ProjectDialogComponent,
      ProjectComponent,
      ProjectDeleteDialogComponent,
      LoginComponent,
      AdminUserComponent,
      UserDialogComponent,
      RegisterComponent,
      AssestDeleteDialogComponent,
      ServerEditDialogComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatProgressBarModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatDatepickerModule,
      MatSidenavModule,
      MatSelectModule,
      MatListModule,
      NgbToastModule,
      ToastModule,
      NgbModule,
      AgGridModule.withComponents([]),
      AccordionModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FileUploadModule,
   ],
   entryComponents:[TeilnehmerDialogComponent , AssestTypeDialogComponent, ExchangeDialogComponent,ServerDialogComponent,
      DeploymentDialogComponent,ProjectDialogComponent,ProjectDeleteDialogComponent,      UserDialogComponent,AssestDeleteDialogComponent,
      ServerEditDialogComponent


   ],
   providers: [
      ProjectService,ServerService,PraktikumsteilnehmerService,MessageService,DeploymentService,TabellenService,ExchangeService,AssestTypeService

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
