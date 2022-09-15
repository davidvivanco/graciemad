import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent, IonSlides, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ValidatorEmail } from 'src/app/shared/custom-validators';
import { Configuration, State } from 'src/app/shared/interfaces';
import { ScrollContentService } from 'src/app/shared/services/scroll-content.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss'],
})
export class HomeMobileComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;


  slideOpts;

  year: string;
  formGroup: FormGroup;
  orientation: OrientationType;
  flipped1: boolean;
  flipped2: boolean;
  flipped3: boolean;
  flipped4: boolean;
  flipped5: boolean;
  loading: boolean;
  conf: Configuration;
  subs: Subscription
  state: Partial<State>;
  emailSent: boolean;

  constructor(
    public utils: UtilsService,
    public scrollContent: ScrollContentService,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer
  ) {

    this.subs = new Subscription();
    this.state = {};
    this.loading = true;
    this.flipped1 = false;
    this.flipped2 = false;
    this.flipped3 = false;
    this.flipped4 = false;
    this.slideOpts = {
      slidesPerView: 1.3,
      breakpoints: {
        540: {
          slidesPerView: 2.3,
        },
        600: {
          slidesPerView: 3.2,
        }
      }
    };

    this.year = new Date().getFullYear().toString();
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required ,ValidatorEmail]],
      message: [null, [Validators.required]],
    })
  }


  ngOnInit(): void {
    this.subs.add(
      this.utils.getState().subscribe(state => {
        this.state = state;
        if (state.configuration) this.conf = state.configuration;
      })
    )
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.scrollContent.content = this.content;
    console.log(this.content)
  }

  async sendInfoEmail() {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      const loading = await this.utils.presentLoading()
      const email = this.formGroup.value.email;
      const text = this.formGroup.value.message;
      this.utils.sendInfoEmail(text, email).subscribe((res) => {
        loading.dismiss();
        this.utils.presentToast('Email enviado con exito.', 'success');
        this.emailSent = true;
      }, () => {
        loading.dismiss();
        this.utils.presentToast('¡Ups!. Algo no fue bien. Inténtalo más tarde.', 'danger')
      });
    }
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }



  rotateCard(card: HTMLElement, cardNumber: number) {
    switch (cardNumber) {
      case 1:
        this.flipped1 = !this.flipped1;
        break;
      case 2:
        this.flipped2 = !this.flipped2;
        break;
      case 3:
        this.flipped3 = !this.flipped3;
        break;
      case 4:
        this.flipped4 = !this.flipped4;
        break;
      case 5:
        this.flipped5 = !this.flipped5;
        break;
      default:
        break;
    }

    card.classList.toggle("flipped")
  }


}
