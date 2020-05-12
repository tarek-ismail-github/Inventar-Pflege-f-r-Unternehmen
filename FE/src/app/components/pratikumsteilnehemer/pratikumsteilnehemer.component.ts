import { Component, OnInit,Inject, OnDestroy, ViewChild } from '@angular/core';
import { TableUtils } from 'src/app/utils/utils'
import { AgGridAngular } from 'ag-grid-angular';


import { PraktikumsteilnehmerService } from 'src/app/services/praktikumsteilnehmer.service';
import { Subscription} from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { TeilnehmerDialogComponent } from '../../dialogs/teilnehmer-dialog/teilnehmer-dialog.component';




@Component({
  selector: 'app-pratikumsteilnehemer',
  templateUrl: './pratikumsteilnehemer.component.html',
  styleUrls: ['./pratikumsteilnehemer.component.css']
})
export class PratikumsteilnehemerComponent implements OnInit , OnDestroy{
  errorMsg: any;
  //@ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
 

  public columnDefs;
  private gridApi;
  private gridColumnApi;
  public localeText;
  public defaultColDef;
  public rowData = [];
  teilnehmerList =[];
  navigationSubscription;
  TeilnehemerListSubscription: Subscription;
  public isRowSelectable;
  addTeilnehmerSubscription: Subscription;


  




  constructor(private teilnehmerService : PraktikumsteilnehmerService,
    private _router: Router,
    private titleService: Title,
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
      { headerName: 'Name', field: 'name' },
      { headerName: 'ProjektID', field: 'ProjektID' },
      { headerName: 'Rolle', field: 'role' },
      { headerName: ' Geburtsdatum', field: 'Geburtsdatum' },
    ];
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    };
   }

  ngOnInit() {
    this.titleService.setTitle('Teilnehmer');
    this.setTeilnehmerRowData()

    this.getAllTeilnehmer();
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
  getAllTeilnehmer() {
    this.teilnehmerService.getTeilnehmer().subscribe(response => {
      this.teilnehmerList = response;
    // }, error => {
    //   console.log(error);
    //   this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Unternehmen kann nicht geladen werden.'});
    });
  }
  setTeilnehmerRowData() {
    this.TeilnehemerListSubscription = this.teilnehmerService.getTeilnehmer()
        .subscribe(data => {
          this.rowData = data;
          setTimeout(() => {
            //this.messageService.clear('mainToast');
          }, 10000);
        }, error => console.log(error)
      );
  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.setTeilnehmerRowData();
  }
  ngOnDestroy() {

    if (this.TeilnehemerListSubscription) {
      this.TeilnehemerListSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  openUserDialog(){
    const dialogRef = this.dialog.open(TeilnehmerDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setTeilnehmerRowData();
    });
  }
  rowsSelected(){   // return this.agGrid.api && this.agGrid.api.getSelectedRows().length > 0;
  } 
   editUserDialog(){}
   deleteUserDialog(){}
}
