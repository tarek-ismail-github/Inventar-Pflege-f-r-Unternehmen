import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';
import { AgGridAngular } from 'ag-grid-angular';
import { MustMatch } from 'src/app/components/validators/password.validator';

@Component({
  selector: 'dadb-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  addUserForm: FormGroup;
  submitted = false;
  companyList = [];
  currentUserCompany;
  user: User;
   @ViewChild('agGrid',{static:false} ) agGrid: AgGridAngular;

  constructor(
    private authService: AuthenticationService,
    private _router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private titleService: Title,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['User', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

  }
  // convenience getter for easy access to form fields
  get addUF() { return this.addUserForm.controls; }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.data !== undefined && this.data.uuid !== undefined) {

      this.submitted = true;

      if (this.addUserForm.invalid) {
        return;
      }

      this.user = this.data;
      this.user.firstName = this.addUserForm.get('firstName').value;
      this.user.lastName = this.addUserForm.get('lastName').value;
      this.user.role = this.addUserForm.get('role').value;

     this.userService.editUser( this.data.uuid , this.user)
      .subscribe(
        response => {
          this.dialogRef.close();
          this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Benutzer erfolgreich bearbeitet' });
          this.submitted = false;
        },
        error => {
          console.log('Error', error);
          if (error) {
           this.messageService.add({  key: 'mainToast', severity: 'error', summary: error.statusText });
           this.submitted = false;
         }
        }
      );

    } else {

      this.submitted = true;
      // stop here if form is invalid
      if (this.addUserForm.invalid) {
        return;
      }

    this.userService.addUser(this.addUserForm.value)
      .subscribe(
        response => {
          this.submitted = false;
          this.dialogRef.close();
          this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Benutzer erfolgreich hinzugefügt' });
        },
        error => {
          console.log('Error', error);
          if (error) {
           this.messageService.add({  key: 'mainToast', severity: 'error', summary: 'Ungültige Daten oder Benutzer bereits vorhanden',
            sticky: true });
           this.submitted = false;
         }
       }
      );
    }

  }

}
