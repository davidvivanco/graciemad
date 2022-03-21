import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private _isDesktop :BehaviorSubject<boolean>;

  constructor(
    private platform: Platform
  ) { 
    this._isDesktop =  new BehaviorSubject<boolean>(this.isDesktop);
  }

  onResize(size: number) {
    this._isDesktop.next(size > 960);
  }

  isDesktopView(): Observable<boolean> {
    return this._isDesktop.asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  /**
  * @description Indicates if the screen size corresponds to a desktop
  */
  get isDesktop(): boolean {
    return this.platform.width() > 960;
  }

}

