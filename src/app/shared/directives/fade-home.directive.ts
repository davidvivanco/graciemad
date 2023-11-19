import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appFadeHeader]'
})
export class FadeHeaderDirective {

  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent) {
    let scrollTop = $event.detail.scrollTop;
    console.log("scrollTop", this.toolbar);
    if (scrollTop >= 225) scrollTop = 225;
    this.domCtrl.write(() => {
      if (scrollTop <= 120) {
        this.menuIcon?.style?.setProperty('background', 'none');
        this.menuIcon?.classList?.remove('menu-icon-visible');
        this.toolbar?.style?.setProperty('--background', 'black');
        this.toolbar?.style?.setProperty('--color', 'white');
      }
      else {
        this.toolbar?.style?.setProperty('--background', 'white');
        this.toolbar?.style?.setProperty('--color', 'black');
        this.menuIcon?.style?.setProperty('color', 'black');
        this.menuIcon?.classList?.add('menu-icon-visible');
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
