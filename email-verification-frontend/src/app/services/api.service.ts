import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }


  callPostApi(apiUrl: string, body: any, options?) {
    return this.http.post(apiUrl, body, {}).pipe(
      tap(
        data => data,
        error => error
      ));
  }


}
