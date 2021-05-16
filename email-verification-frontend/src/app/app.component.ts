import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  isLoader = false;

  private handlerShowLoader: Subscription;
  constructor(private authService: AuthService) {
    this.subscribeServiceData();
  }

  ngOnDestroy() {
    this.unSubscribeServiceData();
  }

  protected subscribeServiceData() {
    this.handlerShowLoader = this.authService.updatedShowLoaderSubject$.subscribe(
      status => {
        setTimeout(() => {
          this.isLoader = status;
        }, 0);
      }
    );
  }

  protected unSubscribeServiceData() {
    if (this.handlerShowLoader) {
      this.handlerShowLoader.unsubscribe();
    }
  }
}
