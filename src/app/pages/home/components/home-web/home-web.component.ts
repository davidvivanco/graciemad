import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ValidatorEmail } from 'src/app/shared/custom-validators';
import { Configuration, State } from 'src/app/shared/interfaces';
import { ScrollContentService } from 'src/app/shared/services/scroll-content.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.component.html',
  styleUrls: ['./home-web.component.scss'],
})
export class HomeWebComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  conf: Configuration;
  openMenu: boolean;
  year: string;
  subs: Subscription;
  slideOpts: any;
  emailSent: boolean;
  state: Partial<State>;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public utils: UtilsService,
    private scrollContent: ScrollContentService,
    private formBuilder: FormBuilder
  ) {
    this.year = new Date().getFullYear().toString();
    this.slideOpts = {
      slidesPerView: 1.8
    };
    this.openMenu = true;
    this.subs = new Subscription();
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, ValidatorEmail]],
      message: [null, []],
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

  ngAfterViewInit(): void {
    this.scrollContent.content = this.content;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toogle() {
    this.openMenu = !this.openMenu;
  }

  async sendInfoEmail() {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      const loading = await this.utils.presentLoading()
      const email = this.formGroup.value.email;
      const text = this.formGroup.value.message;
      this.utils.sendInfoEmail(text, email).subscribe(() => {
        loading.dismiss();
        this.utils.presentToast('Email enviado con exito.', 'success');
        this.emailSent = true;
      }, () => {
        loading.dismiss();
        this.utils.presentToast('¡Ups!. Algo no fue bien. Inténtalo más tarde.', 'danger')
      });
    }
  }

}
