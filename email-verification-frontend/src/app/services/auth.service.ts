import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { GlobalUrls } from '../utils/global-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private showLoader: any = new Subject<any>();
  updatedShowLoaderSubject$ = this.showLoader.asObservable();

  constructor(private apiService: ApiService) { }

  setShowLoaderStatus(status: boolean) {
    this.showLoader.next(status);
  }


  loginUser(payload): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.apiService.callPostApi(`${GlobalUrls.loginUrl}`, payload, {}).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  signUp(payload): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.apiService.callPostApi(`${GlobalUrls.signUpUrl}`, payload, {}).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }


  resendEmail(payload): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.apiService.callPostApi(`${GlobalUrls.resendEmail}`, payload, {}).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  verifyEmail(payload): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.apiService.callPostApi(`${GlobalUrls.verifyEmail.replace('{id}', payload.id)}`, {}, {}).subscribe(
        response => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }



}
