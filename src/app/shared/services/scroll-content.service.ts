import { Injectable } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScrollContentService {
  private _content: IonContent;

  constructor() {
  }

  set content(content: IonContent) {
    this._content = content;
  }

  get content(){
    return this._content;
  }

  scrollTo(x: number) {
    this.content.scrollToPoint(null, x, 1500);
  }

}

