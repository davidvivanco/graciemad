import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appFadeHeader]'
})
export class FadeHeaderDirective {

  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent) {
    let scrollTop = $event.detail.scrollTop;
    if (scrollTop >= 225) scrollTop = 225;
    this.domCtrl.write(() => {
      if (scrollTop <= 120) this.menuIcon.style.setProperty('background', 'none');
      else this.menuIcon.style.setProperty('background', 'var(--ion-color-primary)');
    })
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
