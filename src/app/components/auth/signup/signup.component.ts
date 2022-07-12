import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/shared/auth.service';
import { SignupRequestPayload } from './singup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.SignupRequestPayload = {
      username: '',
      password: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    );
  }

  signup() {
    this.SignupRequestPayload.email = this.signupForm.get('email')?.value;
    this.SignupRequestPayload.username = this.signupForm.get('username')?.value;
    this.SignupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.SignupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, error => {
        this.toastr.error('Registration Failed! PLease Try Again');
      });
  }

}
