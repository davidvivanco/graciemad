import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appFadeHeader]'
})
export class FadeHeaderDirective {

  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent) {
    let scrollTop = $event.detail.scrollTop;
    if (scrollTop >= 225) scrollTop = 225;
    const opacity = scrollTop / 225;

    this.domCtrl.write(() => {
      if (scrollTop === 0) this.toolbar.style.setProperty('display', 'none');
      else this.toolbar.style.setProperty('display', 'block');
      this.toolbar.style.setProperty('opacity', opacity);
      this.menuIcon.style.setProperty('opacity', 1 - opacity);
      if (opacity < 0.10) this.menuIconHeader.style.setProperty('display', 'none');
      else this.menuIconHeader.style.setProperty('display', 'block');
      if (1 - opacity <= 0.22) this.menuIcon.style.setProperty('display', 'none');
      else this.menuIcon.style.setProperty('display', 'block');
    })
  };

  @Input('appFadeHeader') toolbar: any;
  @Input('menuIcon') menuIcon: any;
  @Input('menuIconHeader') menuIconHeader: any;


  constructor(
    private domCtrl: DomController
  ) {
  }

  ngOnInit(): void {
    this.toolbar = this.toolbar.el;
    this.menuIcon = this.menuIcon.el;
    this.menuIconHeader = this.menuIconHeader.el;
  }

}
