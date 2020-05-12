import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { TableUtils } from 'src/app/utils/utils';
import { UserDialogComponent } from 'src/app/dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  errorMsg: any;
  @ViewChild('agGrid',{static:true}) agGrid: AgGridAngular;

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  resetPassForm: FormGroup;
  companyForm: FormGroup;
  submitted = false;
  userSelectFlag = false;
  addUserSubscription: Subscription;
  result: any;
  UserListSubscription: Subscription;
  UserDeleteSubscription: Subscription;
  UserEditSubscription: Subscription;
  UserResetSubs: Subscription;
  navigationSubscription;
  public defaultColDef;
  public columnDefs;
  public localeText;
  public rowData = [];
  companyList = [];

  private gridApi;
  private gridColumnApi;
  private uuidCurrentUser;
  private emailCurrent;
  private firstNameCurrent;
  private lastNameCurrent;
  private roleCurrent;
  public rowSelection;
  public isRowSelectable;


  constructor(
    private authService: AuthenticationService,
    private _router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private messageService: MessageService,
    private titleService: Title,
    private userService: UserService,
    public dialog: MatDialog
  ) { this.localeText = TableUtils.localeText;

    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

    this.columnDefs = [

      { headerName: 'E-Mail', field: 'email' },
      { headerName: 'Vorname', field: 'firstName' },
      { headerName: 'Nachname', field: 'lastName' },
      { headerName: 'Rolle', field: 'role' }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    };

    this.isRowSelectable = function(rowNode) {
      return rowNode.data ? rowNode.data.email !== 'admin@unileipzig.net' : false;
    };
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.setUserRowData();
  }


  ngOnInit() {

    this.titleService.setTitle('Administration - Nutzer');

    this.setUserRowData();

    this.editUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['User', Validators.required]
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

  // convenience getter for easy access to form fields
  get addUF() { return this.addUserForm.controls; }
  get editUF() { return this.editUserForm.controls; }
  get resetUF() { return this.resetPassForm.controls; }


  rowsSelected() {
    return this.agGrid.api && this.agGrid.api.getSelectedRows().length > 0;
  }


  setUserRowData() {
    this.UserListSubscription = this.userService.getAllUsers()
        .subscribe(data => {
          this.rowData = data.data;
          setTimeout(() => {
            this.messageService.clear('mainToast');
          }, 10000);
        }, error => console.log(error)
      );
  }

  resetFilter() {
    this.companyForm.get('companyUuid').reset();
    this.setUserRowData();
  }

ngOnDestroy() {

    if (this.UserListSubscription) {
      this.UserListSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  

  openUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setUserRowData();
    });
  }

  editUserDialog() {
    // const selectedRow = this.gridApi.getSelectedRows();
    // const dialogRef = this.dialog.open(UserDialogComponent, {
    //   width: '650px',
    //   data: selectedRow['0']
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.setUserRowData();
    // });
  }

  deleteUserDialog() {
    // const selectedRow = this.gridApi.getSelectedRows();
    // const dialogRef = this.dialog.open(UserDeleteComponent, {
    //   width: '650px',
    //   data: selectedRow['0']
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.setUserRowData();
    // });
  }

  

}
