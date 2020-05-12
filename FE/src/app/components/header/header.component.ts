import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser;

  constructor(public authService: AuthenticationService,
    private messageService: MessageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.isLoggedInAsync().subscribe(result => {
      if (this.authService.getCurrentUserValue() && this.authService.getCurrentUserValue().user ) {
        this.currentUser = this.authService.getCurrentUserValue().user.firstName;
      }
    });
  }
  changePassword() {
    // const dialogRef = this.dialog.open(ChangePasswordComponent, {
    //   width: '650px',
    //   data: {}
    // });
  }
}
