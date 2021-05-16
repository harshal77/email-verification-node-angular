import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isVerification = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    const payload = {
      userName: this.loginForm.value.email,
      password: Md5.hashStr(this.loginForm.value.password.trim())
    };
    this.authService.setShowLoaderStatus(true);
    this.authService.loginUser(payload).subscribe(response => {
      this.authService.setShowLoaderStatus(false);
      this.router.navigate(['/home']);
    }, (error) => {
      this.authService.setShowLoaderStatus(false);
      if (error.error && error.error.statusCode === 412) {
        this.isVerification = true;
        alert('Please verify user email id');
      }
      console.log(error);
    });
  }

  createAccount(): void {
    this.router.navigate(['/sign-up']);
  }

  resendMail() {
    const payload = {
      userName: this.loginForm.value.email,
    };
    this.authService.setShowLoaderStatus(true);
    this.authService.resendEmail(payload).subscribe(response => {
      this.authService.setShowLoaderStatus(false);
      alert('Verification mail has been sent.Please verify your account.');
    }, (error) => {
      this.authService.setShowLoaderStatus(false);
      console.log(error);
    });
  }

}
