import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  isVerify = false;
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.verifyMail(param);
  }

  verifyMail(id) {
    const payload = {
      id
    };
    this.authService.setShowLoaderStatus(true);
    this.authService.verifyEmail(payload).subscribe(response => {
      this.authService.setShowLoaderStatus(false);
      this.isVerify = true;
    }, (error) => {
      this.authService.setShowLoaderStatus(false);
      console.log(error);
    });
  }

}
