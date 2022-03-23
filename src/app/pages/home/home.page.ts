import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonContent, IonSlides, MenuController, ScrollCustomEvent } from '@ionic/angular';
import { ScrollContentService } from 'src/app/shared/services/scroll-content.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @HostListener('ionScroll', ['$event']) onContentScroll($event: ScrollCustomEvent)
   {
    let scrollTop = $event.detail.scrollTop
    if(scrollTop > 140) this.title1.classList.add("marking");
    if(scrollTop > 1270) this.title2.classList.add("marking");
    if(scrollTop > 1710) this.title3.classList.add("marking");    
  }


  @ViewChild('title1') title1;
  @ViewChild('title2') title2;
  @ViewChild('title3') title3;
  @ViewChild('socialMediaBar') socialMediaBar;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('slider') slider: IonSlides;

  slideOpts;
  readonly urlGoogleMaps: string;
  readonly urlFacebook: string;
  readonly urlInstagram: string;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.MarkerOptions;
  year: string;
  formGroup: FormGroup;
  orientation: OrientationType;

  constructor(
    public utils: UtilsService,
    private scrollContent: ScrollContentService,
    private menu: MenuController,
    private screenOrientation: ScreenOrientation,
    private formBuilder: FormBuilder
  ) {
    this.urlGoogleMaps = 'https://www.google.com/maps/place/Ichi+Ban/@40.4831372,-3.3715561,17z/data=!3m1!4b1!4m5!3m4!1s0xd42490d570d5ac5:0x67c261a96ee0fdf2!8m2!3d40.4831034!4d-3.3694483';
    this.urlFacebook = 'https://www.facebook.com/graciemadridbjj/';
    this.urlInstagram = 'https://www.instagram.com/gracie_madrid_academy/';
    this.orientation = this.screenOrientation.type as OrientationType;
    this.marker = { position: { lat: 40.4831331, lng: -3.3715561 } };
    this.slideOpts = {
      slidesPerView: 1.1,
      breakpoints: {
        640: {
          slidesPerView: 2.5,
        }
      }
    };
    this.year = new Date().getFullYear().toString();
    this.mapOptions = {
      center: { lat: 40.4831331, lng: -3.3715561 },
      zoom: 16,
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      disableDoubleClickZoom: true,
    };
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required]],
      message: [null, [Validators.required]],
    })

  }

  ngOnInit() {
    this.screenOrientation.onChange().subscribe((e) => {
      this.orientation = this.screenOrientation.type as OrientationType
    })

    setTimeout(() => {
      this.socialMediaBar.el.style.setProperty('display', 'flex');
    }, 1500);
  }

  ngAfterViewInit(): void {
    this.scrollContent.content = this.content;
    this.title1 = this.title1.nativeElement;
    this.title2 = this.title2.nativeElement;
    this.title3 = this.title3.nativeElement;
  }

  send() {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      console.log('Enviado')
    }
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  openMap() {
    this.utils.openUrl(this.urlGoogleMaps)
  }

  openFacebook() {
    this.utils.openUrl(this.urlFacebook)
  }

  openInstagram() {
    this.utils.openUrl(this.urlInstagram)
  }

  async onSlideChanged() {
    const index = await this.slider.getActiveIndex();
    console.log(await this.slider.getActiveIndex())
    this.slider.lockSwipeToNext(index === 2);
  }
}
