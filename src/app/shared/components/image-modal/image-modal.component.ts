import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  sliderOpts;
  zoomActive: boolean;
  zoomScale: number;
  imgSrc: string;
  
  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;

  constructor(
    public utils: UtilsService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {
    this.zoomActive = false;
    this.zoomScale = 1;
    this.sliderOpts = {
      zoom: {
        maxRatio: 3
      },
      on: {
        zoomChange: (scale, imageEl, sideEl) => {
          this.zoomActive = true;
          this.zoomScale = scale / 5
        }
      },
      allowTouchMove: false,
      sliderPerView: 1,
      centeredlides: true,
    }
  }

  ngOnInit() {
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
      return;
    }

    zoom.out();
  }

  async onBack() {
    await this.modalCtrl.dismiss()
  }

  touchStart(div) {
    console.log(div)
    div.el.style['z-index'] = 11;
  }

  async touchEnd(slides: IonSlides, div) {
    const slider = await slides.getSwiper();
    const zoom = slider.zoom;
    zoom.out();
    this.zoomActive = false;
    div.el.style['z-index'] = 9;
    this.changeDetectorRef.detectChanges();
  }

}
