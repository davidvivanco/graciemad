import { Component, OnInit } from '@angular/core';
import { browser } from 'protractor';
import { take } from 'rxjs/operators';
import { State } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  loading: boolean;
  photos: Array<string>;
  mobilePhotos: Array<string>;
  segment: 'single' | 'grid';
  state: Partial<State>;
  
  constructor(
    public utils: UtilsService
  ) {
    this.mobilePhotos = [];
    this.photos = [];
    this.segment = 'single';
    this.loading = true;
    this.setPhotos();
    this.mobilePhotos = [this.photos[0], this.photos[1], this.photos[2]];
    this.state = this.utils.getLastState();
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }

  ngOnInit() {
  }

  // ionViewDidEnter() {
  //   this.utils.getState().pipe(take(1)).subscribe(state => {
  //     this.loading = false;
  //     setTimeout(() => {
  //       this.utils.updateState({ ...state, loading: this.loading });
  //     }, 1500);
  //   });
  // }

  setPhotos() {
    const photos = [
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_24.png?alt=media&token=a646fc3a-d524-41e3-9727-4f18762c102b',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_1.png?alt=media&token=faee5852-9f86-443b-8727-4436dea93576',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_14.png?alt=media&token=4c09303a-8fb1-414a-8381-0f32e8c62f6b',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_6.png?alt=media&token=e8015d5d-5020-43fc-8107-92bb0eb08bac',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_10.png?alt=media&token=39373874-a1d0-4c24-be61-613309b4c07c',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_11.png?alt=media&token=d751b042-0b33-4196-a5f1-289f571ffe77',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_13.png?alt=media&token=1504d40a-95d9-49fd-ac20-a7b02131ee4f',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_25.png?alt=media&token=b95f468e-4085-4f71-9e2a-f3e4f5ba3898',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_26.png?alt=media&token=0a3397eb-6ae2-494f-ad6f-8c42fb3619ca',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_27.png?alt=media&token=1c2a3a3f-793d-48c6-a51f-be35891477b9',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_37.png?alt=media&token=c592cadd-412f-4ba1-917d-1b6900ad6c11',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_28.png?alt=media&token=7761cb70-a27f-4801-a8f0-56c754b8f6e6',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_29.png?alt=media&token=68bcfbfb-4c10-4a69-ba86-5e5393a7b713',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_31.png?alt=media&token=53233ff0-553b-433d-9126-94e3c2c360ce',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_32.png?alt=media&token=18ed1ca0-cec1-44a8-ada9-0482c62da2e5',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_33.png?alt=media&token=2b88273f-bc01-47c2-8259-bae8fb9c6f00',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_34.png?alt=media&token=7c46a8fd-c7b0-4e30-b4b3-3c5c6a151a4a',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_36.png?alt=media&token=7ad1c8b6-82eb-439f-8253-c3c611273e69',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_14.png?alt=media&token=4c09303a-8fb1-414a-8381-0f32e8c62f6b',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_16.png?alt=media&token=3060564f-b134-46cd-abf7-3c497f02d8d0',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_5.png?alt=media&token=7abd947f-67f8-4255-bffa-7452d8464018',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_6.png?alt=media&token=e8015d5d-5020-43fc-8107-92bb0eb08bac',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_18.png?alt=media&token=e65a394d-8391-4722-aaf2-0274ce43c6d3',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_2.png?alt=media&token=4c9523de-1560-47a0-bba2-833f2c729154',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_20.png?alt=media&token=c1e436cc-82e3-4a33-80ea-41f1c6d63760',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_7.png?alt=media&token=d1899040-2b04-43ac-99e6-dc4a16fcebbf',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_22.png?alt=media&token=83c6eb0d-b100-41c7-92ac-79c60f24210d',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_3.png?alt=media&token=aafcda5d-fabd-4a5d-8ead-530eb851bce1',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_8.png?alt=media&token=1f5f99c6-e8a8-4a92-826a-f48f1b0e084c',
      'https://firebasestorage.googleapis.com/v0/b/gracie-madrid.appspot.com/o/img_9.png?alt=media&token=5c78edcf-5823-44f0-891a-b21111d66de6',
    ];

    if (!this.utils.isDesktop) {
      this.photos = photos;
      return;
    }

    let count = 0;
    while (count < photos.length) {
        this.photos.push(photos[count]);
        count++;  
    }
  }

  loadPhotos(event) {
    let index = this.mobilePhotos.length - 1;
    console.log(this.mobilePhotos.length, this.photos.length);

    if (this.mobilePhotos.length === this.photos.length) {
      event?.target?.complete();
      if (event) event.target.disabled = true;
      return;
    }

    if (this.segment === 'grid') {
      for (let i = 0; i < 6; i++) {
        index++;
        this.mobilePhotos.push(this.photos[index]);
        if (this.mobilePhotos.length === this.photos.length) break;
      }
      event?.target?.complete();
      return;
    }

    for (let i = 0; i < 3; i++) {
      index++;
      this.mobilePhotos.push(this.photos[index]);
      if (this.mobilePhotos.length === this.photos.length) break;
    }
    event?.target?.complete();

  }

  detailPhoto() {
    this.segment = 'single';
  }


  segmentChanged(event) {
    this.segment = event.detail.value;
    this.loadPhotos(null);
  }
}
