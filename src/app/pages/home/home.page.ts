import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonContent, IonSlides, MenuController, ScrollCustomEvent } from '@ionic/angular';
import { pipe, Subscription } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Configuration, ReadMoreType, State } from 'src/app/shared/interfaces';
import { ScreenSizeService } from 'src/app/shared/services/screen-size.service';
import { ScrollContentService } from 'src/app/shared/services/scroll-content.service';
import { FirebaseStorageService } from 'src/app/shared/services/storage.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild('title1') title1;
  @ViewChild('title2') title2;
  @ViewChild('title3') title3;
  @ViewChild('swipe') swipe;
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

  constructor(
    public utils: UtilsService,
    public scrollContent: ScrollContentService,
    private menu: MenuController,
    private screenSizeService: ScreenSizeService,
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
      email: [null, [Validators.required]],
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

    this.screenSizeService.isDesktopView()
    .pipe(distinctUntilChanged())
    .subscribe(isDesktop => {
      this.scrollContent.content = this.content;
    })
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollContent.content = this.content;
      console.log(this.content)
    }, 1000);
    console.log(this.content)
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
