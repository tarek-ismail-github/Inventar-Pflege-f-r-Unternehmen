import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AssestTypeDialogComponent } from '../../dialogs/assest-type-dialog/assest-type-dialog.component';
import { ExchangeDialogComponent } from '../../dialogs/exchange-dialog/exchange-dialog.component';
import { MessageService } from 'primeng/api';
import { ExchangeService } from 'src/app/services/exchange.service';
import { TableUtils } from 'src/app/utils/utils';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AssestDeleteDialogComponent } from 'src/app/dialogs/assest-delete-dialog/assest-delete-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { AssestTypeService } from 'src/app/services/assest-type.service';
import { Table } from 'src/app/models/table';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-add-new-asset',
  templateUrl: './create-asset-type.component.html',
  styleUrls: ['./create-asset-type.component.css']
})
export class CreateAssetTypeComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;

  public columnDefs;
  public defaultColDef;
  public rowData = [];
  private gridApi;
  private gridColumnApi;
  public rowSelection;
  public localeText;
  navigationSubscription;
  isFetching = true;
  TableListSubscription : Subscription;
  public tableList:any=[];
  table : Table;
  loadedPosts = [];
  errorMsg: any;

  constructor(    private messageService: MessageService,
    public dialog: MatDialog,
    private _router: Router,
    private titleService: Title,
    private tableService : AssestTypeService,
    ) {
      this.columnDefs = [
          {
              headerName: "Namen der Tabellen",
              field: "value",
              width: 100
          }
      ];
    this.localeText = TableUtils.localeText;
    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    })
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
     this.setTableRowData();
    }

  ngOnInit() {
    this.titleService.setTitle('Assest');
   this.setTableRowData();
    this.getAllTables();
    this.isFetching = true;
  }

  ngOnDestroy() {
    if (this.TableListSubscription) {
      this.TableListSubscription.unsubscribe();
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getAllTables() {
    this.tableService.getTables().subscribe(data => {
      this.tableList = data.tables;
      //console.log(this.tableList);

    }, error => {
      console.log(error);
      this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Tablle kann nicht geladen werden.'});
    } );
  }

  setTableRowData(){
    this.TableListSubscription = this.tableService.getTables()
        .subscribe(data => {
          this.rowData = data.tables.map(function(item) {
            return {"value":item}
          });
          console.log(this.rowData);

        }, error => console.log(error)
      );
  }

  openAssestDialog(){
    const dialogRef = this.dialog.open(AssestTypeDialogComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setTableRowData();
    });
  }

  openAssestDeleteDialog(){
    const selectedRow = this.gridApi.getSelectedRows();

    const dialogRef = this.dialog.open(AssestDeleteDialogComponent, {
      width: '1000px',
      data: selectedRow['0']
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setTableRowData();
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

}
