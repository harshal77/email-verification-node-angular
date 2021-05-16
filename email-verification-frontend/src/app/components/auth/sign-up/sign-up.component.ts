import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  countryList = [];
  stateList = [];
  subjects = [];
  metadata;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }

  onSubmit() {
    const payload = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      country: this.signUpForm.value.country,
      mobile: this.signUpForm.value.mobile,
      password: Md5.hashStr(this.signUpForm.value.password.trim()),
    };
    this.authService.setShowLoaderStatus(true);
    this.authService.signUp(payload).subscribe(response => {
      this.authService.setShowLoaderStatus(false);
      alert('Your account has been created.Verification mail has been sent.Please verify your account.');
      this.router.navigate(['/login']);
    }, error => {
      this.authService.setShowLoaderStatus(false);
      console.log(error);
    });
  }

  createAccount(): void {
    this.router.navigate(['/sign-up']);
  }

}
