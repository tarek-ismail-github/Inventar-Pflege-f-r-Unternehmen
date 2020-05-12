import { Component, OnInit, ViewChild } from '@angular/core';
import { Deployment } from '../../models/deployment.model';
import { HttpClient } from '@angular/common/http';
import {  DeploymentService } from '../../services/deployment.service';
import { TableUtils } from 'src/app/utils/utils';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material';
import { DeploymentDialogComponent } from 'src/app/dialogs/deployment-dialog/deployment-dialog.component';


@Component({
  selector: 'app-Deployment',
  templateUrl: './Deployment.component.html',
  styleUrls: ['./Deployment.component.css']
})
export class DeploymentComponent implements OnInit {
  errorMsg: any;
  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;

  public columnDefs;
  public localeText;
  public defaultColDef;
  public rowData = [];
  public rowSelection;
  private gridApi;
  private gridColumnApi;
  navigationSubscription;
  DeploymentListSubscription: Subscription;
  public deploymentList:any  =[];
  loadedPosts = [];
  isFetching = true;
  public errorMg ;
  error = null;

  constructor(private http: HttpClient,
    private deploymentService: DeploymentService,
    private _router: Router,
     private titleService: Title,
    private messageService: MessageService,
    public dialog: MatDialog

    ) {
      this.localeText = TableUtils.localeText;
      this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    this.columnDefs = [
      { headerName: ' Datum', field: 'Datum' },
      { headerName: 'DeployID', field: 'DeployID' },
      { headerName: ' DurchfuehrenderMitarbeiter', field: 'DurchfuehrenderMitarbeiter' },
      { headerName: 'InstallierteVersion', field: 'InstallierteVersion' },
      { headerName: ' ProjektID', field: 'ProjektID' },
      { headerName: ' ServerID', field: 'ServerID' },
    ];
    this.rowSelection = 'single';

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
    this.setDeploymentRowData();
  }
  ngOnInit() {
    this.titleService.setTitle('Deployment');
    this.setDeploymentRowData();
    this.getDeployment();
    this.isFetching = true;


    // this.deploymentService.getAllDeployment().subscribe(data => this.deploymentList = data.data
    //                                                   ,error => this.errorMg=error);

    // this.isFetching = true;
    // this.deploymentService.getDeployment().subscribe(posts => {
    //     this.isFetching = false;
    //     this.loadedPosts = posts;
    //   }, error => {
    //     this.isFetching = false;
    //     this.error = error.message;
    //   });
    //   this.onFetchPosts();
  }
  getDeployment() {
    this.deploymentService.getAllDeployment().subscribe(data => this.deploymentList = data.data
    , error => {
      console.log(error);
      this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Deployment kann nicht geladen werden.'});
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
  openDeploymentDialog(){
    const dialogRef = this.dialog.open(DeploymentDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setDeploymentRowData();
    });
  }
  // rowsSelected() {
  //   return this.agGrid.api && this.agGrid.api.getSelectedRows().length > 0;
  // }
  setDeploymentRowData() {
    this.DeploymentListSubscription = this.deploymentService.getAllDeployment()
        .subscribe(data => {
          this.rowData = data.data;
        }, error => console.log(error)
      );
  }
  ngOnDestroy() {

    if (this.DeploymentListSubscription) {
      this.DeploymentListSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  editDeploymentDialog() {
    const selectedRow = this.gridApi.getSelectedRows();
    const dialogRef = this.dialog.open(DeploymentDialogComponent, {
      width: '650px',
      data: selectedRow['0']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setDeploymentRowData();
    });
  }
  deleteDeploymentDialog() {
    // const selectedRow = this.gridApi.getSelectedRows();
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   width: '650px',
    //   data: selectedRow['0']
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.setProjektRowData();
    // });
  // onCreatePost(postData: Deployment) {
  //   this.deploymentService.createAndStoryPost(postData.DeployID, postData.InstallierteVersion,
  //     postData.Datum, postData.DurchfuehrenderMitarbeiter, postData.ProjektID, postData.ServerID);
  // }
  }
  // onFetchPosts() {
  //   this.isFetching = true;
  //   this.deploymentService
  //   .fetchsPosts().subscribe(posts => {
  //       this.isFetching = false;
  //       this.loadedPosts = posts;
  //     }, error => {
  //       this.isFetching = false;
  //       this.error = error.message;
  //     });
  //    }

     onHandleError() {
       this.error = null;
     }

    //  onClearPosts() {
    //    this.deploymentService.deletePosts().subscribe(() => {
    //     this.loadedPosts = [];
    //    });
    //  }



  }
