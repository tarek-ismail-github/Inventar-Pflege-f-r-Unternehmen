import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  resetFromLogin: FormGroup;
  doNotDirectlyCallSubscription: Subscription;
  loginSubscription: Subscription;
  returnUrl: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    //


    // reset login status
    this.doNotDirectlyCallSubscription = this._authService.isLoggedInAsync().subscribe((state) => {
      if (state) {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigateByUrl(this.returnUrl);
      }
    });
  }
  // convenience getter for easy access to form fields
  get resetFL() { return this.resetFromLogin.controls; }


  ngOnDestroy() {
    this.doNotDirectlyCallSubscription.unsubscribe();
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.messageService.clear('mainToast');
    // delete old authtoken
    this._authService.logoutUser();
    this.loginSubscription = this._authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        response => {
          const url = this._route.snapshot.queryParams['returnUrl'] || '/home';
          this._router.navigate([url]);
          this.loading = false;
        },
        error => {
           console.log('Error', error);
           if (error.status === 401) {
            this.messageService.add({  key: 'mainToast', severity: 'error', summary: 'Nutzername oder Kennwort inkorrekt.', sticky: true });
          } else if (error.statusText) {
            this.messageService.add({  key: 'mainToast', severity: 'error', summary: error.statusText, sticky: true });
          }
          this.loading = false;
        }
      );
  }

}
