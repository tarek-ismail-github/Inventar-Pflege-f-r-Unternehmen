import { Server } from './../../models/server.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../services/server.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TableUtils } from 'src/app/utils/utils';
import { Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServerDialogComponent } from 'src/app/dialogs/server-dialog/server-dialog.component';
import { MatDialog } from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular';
import { ServerEditDialogComponent } from 'src/app/dialogs/server-edit-dialog/server-edit-dialog.component';

@Component({
  selector: 'app-Server',
  templateUrl: './Server.component.html',
  styleUrls: ['./Server.component.css']
})
export class ServerComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;

  public columnDefs;
  public defaultColDef;
  public rowData = [];
  private gridApi;
  private gridColumnApi;
  public rowSelection;
  public localeText;
  public serverList:any  =[];

  loadedPosts = [];
  isFetching = true;
  error = null;
  navigationSubscription;
  ServerListSubscription : Subscription;

  constructor(private http: HttpClient, private serverService: ServerService,
    private titleService: Title,
    private _router: Router,
    private messageService: MessageService,
    public dialog: MatDialog

    ) {
    this.localeText = TableUtils.localeText;
    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    })
    this.columnDefs = [
      { headerName: 'OS', field: 'OS' },
      { headerName: 'Ort', field: 'Ort' },
      { headerName: 'Typ', field: 'Typ' },
      { headerName: 'ServerID', field: 'ServerID' },
      
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
    //this.setProjektRowData();
  }
  ngOnInit() {
    this.titleService.setTitle('Server');
    this.setServerRowData();
    this.getServers();
    this.isFetching = true;
    // this.serverService.fetchsPosts().subscribe(posts => {
    //     this.isFetching = false;
    //     this.loadedPosts = posts;
    //   }, error => {
    //     this.isFetching = false;
    //     this.error = error.message;
    //   });
  }
  getServers() {
    this.serverService.getAllServer().subscribe(data => this.serverList = data.data
    , error => {
      console.log(error);
      this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Server kann nicht geladen werden.'});
    });
  }
  ngOnDestroy() {
    if (this.ServerListSubscription) {
      this.ServerListSubscription.unsubscribe();
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  setServerRowData(){
    this.ServerListSubscription = this.serverService.getAllServer()
        .subscribe(data => {
          this.rowData = data.data;
        }, error => console.log(error)
      );
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
  openServerDialog(){
    const dialogRef = this.dialog.open(ServerDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setServerRowData();
    });
  }
  editServerDialog() {
    const selectedRow = this.gridApi.getSelectedRows();
    const dialogRef = this.dialog.open(ServerEditDialogComponent, {
      width: '650px',
      data: selectedRow['0']
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setServerRowData();
    });
  }
  deleteServerDialog() {
    // const selectedRow = this.gridApi.getSelectedRows();
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   width: '650px',
    //   data: selectedRow['0']
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.setProjektRowData();
    // });
  }


  // onCreatePost(postData: Server) {
  //   this.serverService.createAndStoryPost(postData.ServerID, postData.Typ, postData.Ort, postData.OS);
  // }

  // onFetchPosts() {
  //   this.isFetching = true;
  //   this.serverService
  //   .fetchsPosts().subscribe(posts => {
  //       this.isFetching = false;
  //       this.loadedPosts = posts;
  //     }, error => {
  //       this.isFetching = false;
  //       this.error = error.message;
  //     });
  //    }

  //    onHandleError() {
  //      this.error = null;
  //    }

  //    onClearPosts() {
  //      this.serverService.deletePosts().subscribe(() => {
  //       this.loadedPosts = [];
  //      });
  //    }
}
