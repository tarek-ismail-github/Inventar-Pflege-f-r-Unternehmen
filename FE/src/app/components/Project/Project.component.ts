import { Project } from './../../models/project.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../services/project.service';
import { TableUtils } from 'src/app/utils/utils';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AgGridAngular, AgGridModule, AgGridColumn } from 'ag-grid-angular';
import { MatDialog } from '@angular/material';
import { ProjectDialogComponent } from 'src/app/dialogs/project-dialog/project-dialog.component';
import { GridOptions } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDeleteDialogComponent } from 'src/app/dialogs/project-delete-dialog/project-delete-dialog.component';

@Component({
  selector: 'app-Project',
  templateUrl: './Project.component.html',
  styleUrls: ['./Project.component.css']
})
export class ProjectComponent implements OnInit {
  submitted = false;
  public columnDefs;
  public defaultColDef;
  public rowData = [];
  private gridApi;
  private gridColumnApi;
  public rowSelection;
  public localeText;
  loadedPosts = [];
  public projektList:any  =[];
  result: any;
  isFetching = true;
  error = null;
  navigationSubscription;
  ProjektListSubscription : Subscription;
  public isRowSelectable;
  userSelectFlag = false;


  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;


  constructor(private http: HttpClient, 
    private projectService: ProjectService,
    private titleService: Title,
    private _router: Router,
    private messageService: MessageService,
    private dialog : MatDialog,

    ) {
    
    this.localeText = TableUtils.localeText;
    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    })
    this.columnDefs = [
      { headerName: 'ProjektID', field: 'ProjektID' },
      { headerName: 'Name', field: 'Name' },
      { headerName: 'Mitarbeiter', field: 'Mitarbeiter' },
      { headerName: 'Kunde', field: 'Kunde' },
      { headerName: 'Kosten', field: 'Kosten' },
      { headerName: 'Projektstart', field: 'Projektstart' },
      { headerName: 'Projektende', field: 'Projektende' },

    ];

    this.rowSelection = 'single';
    this.rowsSelected;
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    };

  }
  rowsSelected() {
    return this.agGrid.api && this.agGrid.api.getSelectedRows().length > 0 ;
  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.setProjektRowData();
  }
  ngOnInit() {
    this.titleService.setTitle('Projekt');
    this.setProjektRowData();
    this.getProjekts();
    
  }
  getProjekts() {
    this.projectService.getAllProjekt().subscribe(data => this.projektList = data.data
    , error => {
      console.log(error);
      this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Projekte kann nicht geladen werden.'});
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }
  ngOnDestroy() {
    if (this.ProjektListSubscription) {
      this.ProjektListSubscription.unsubscribe();
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  setProjektRowData(){
    this.ProjektListSubscription = this.projectService.getAllProjekt()
        .subscribe(data => {
          this.rowData = data.data;
        }, error => console.log(error)
      );
  }
  openProjectDialog(){
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setProjektRowData();
    });
  }

     onHandleError() {
       this.error = null;
     }

    //  onClearPosts() {
    //    this.projectService.deletePosts().subscribe(() => {
    //     this.loadedPosts = [];
    //    });
    //  }
     
    editProjectDialog() {
      const selectedRow = this.gridApi.getSelectedRows();
      const dialogRef = this.dialog.open(ProjectDialogComponent, {
        width: '650px',
        data: selectedRow['0']
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.setProjektRowData();
      });
    }
    deleteProjectDialog() {
      const selectedRow = this.gridApi.getSelectedRows();
      const dialogRef = this.dialog.open(ProjectDeleteDialogComponent, {
        width: '650px',
        data: selectedRow['0']
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.setProjektRowData();
      });
    }
}
