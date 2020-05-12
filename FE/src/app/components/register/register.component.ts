import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private _userService: UserService) {

  }

  ngOnInit() {  
  }

  onSubmit() {
    
    console.log(this.registrationForm.value);
    this._userService.addUser(this.registrationForm.value)
      .subscribe(
        response => console.log("Success"),
        error => console.error()
      )
  }
}
