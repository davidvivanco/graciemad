import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('socialMediaBar') socialMediaBar;
  slideOpts;
  readonly urlGoogleMaps: string;
  readonly urlFacebook: string;
  readonly urlInstagram: string;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.MarkerOptions;
  year: string;
  formGroup: FormGroup;

  constructor(
    private menu: MenuController,
    private formBuilder: FormBuilder
  ) {
    this.urlGoogleMaps = 'https://www.google.com/maps/place/Ichi+Ban/@40.4831372,-3.3715561,17z/data=!3m1!4b1!4m5!3m4!1s0xd42490d570d5ac5:0x67c261a96ee0fdf2!8m2!3d40.4831034!4d-3.3694483';
    this.urlFacebook = 'https://www.facebook.com/graciemadridbjj/';
    this.urlInstagram = 'https://www.instagram.com/gracie_madrid_academy/';

    this.marker = { position: { lat: 40.4831331, lng: -3.3715561 } };
    this.slideOpts = { slidesPerView: 1.1 };
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
    setTimeout(() => {
      this.socialMediaBar.el.style.setProperty('display', 'block');
    }, 1500);
  }

  send(){
    this.formGroup.markAsTouched();
    if(this.formGroup.valid){
      console.log('Enviado')
    }
  }

  openMenu() {
    console.log("open")
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  openMap() {
    window.open(this.urlGoogleMaps, '_blanck')
  }

  openFacebook() {
    window.open(this.urlFacebook, '_blanck')
  }
  openInstagram() {
    window.open(this.urlInstagram, '_blanck')
  }

  openSocialMedia(e) {
    const y = e.clientY;
    if (y <= 270) {
      this.openFacebook();
      return;
    } else if (y > 270 && y < 298) {
      this.openInstagram();
    }
  }
}
