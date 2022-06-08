import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  header: any;
  headerHeight: number;
  moveImage: number;
  scaleImage: number;


  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private domCtrl: DomController
  ) { }

  ngOnInit(): void {
    let content = this.element.nativeElement;
    this.header = content.getElementsByClassName('parallax-image')[0];
    if (this.header) {
      this.domCtrl.read(() => {
        this.headerHeight = this.header.clientHeight;
      });
    }
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent) {
    if(this.header){
      const scrollTop = $event.detail.scrollTop;
      if (scrollTop > 0) {
        this.moveImage = scrollTop / 2;
        this.scaleImage = 1;
      } else {
        this.moveImage = scrollTop / 1.4;
        this.scaleImage = scrollTop / this.headerHeight + 1;
      }
      this.renderer.setStyle(this.header, 'webkitTransform',
        'translate3d(0,' + this.moveImage + 'px,0) scale(' + this.scaleImage + ',' + this.scaleImage + ')'
      )
    }

  }

}
