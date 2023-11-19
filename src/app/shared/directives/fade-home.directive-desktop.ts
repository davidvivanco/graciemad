import { Directive, HostListener, Input } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appFadeHeaderDesktop]'
})
export class FadeHeaderDirectiveDesktop {

  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent) {
    let scrollTop = $event.detail.scrollTop;
    if (scrollTop >= 225) scrollTop = 225;
    console.log(this.toolbar)
    this.domCtrl.write(() => {
      if (scrollTop <= 120) {
        this.toolbar.style.setProperty('--background', 'black');
      }
      else {
        this.toolbar.style.setProperty('--background', 'white');
      }
    });
  };

  @Input('appFadeHeader') toolbar: any;
  @Input('menuIcon') menuIcon: any;


  constructor(
    private domCtrl: DomController
  ) {
  }

  ngOnInit(): void {
    this.toolbar = this.toolbar.el;
    this.menuIcon = this.menuIcon.el;
  }

}
