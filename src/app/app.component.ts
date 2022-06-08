import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Configuration, State } from './shared/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import { ScreenSizeService } from './shared/services/screen-size.service';
import { FirebaseStorageService } from './shared/services/storage.service';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isDesktop: boolean;
  @HostListener('window:resize', ['$event'])
  private onResize(e) {
    this.screenSizeService.onResize(e.target.innerWidth)
  }

  lang: 'es' | 'en';
  configuration: Configuration;
  loading: boolean;
  state: Partial<State>
  constructor(
    public utils: UtilsService,
    private screenSizeService: ScreenSizeService,
    private router: Router,
    private translate: TranslateService,
    private firebaseStore: FirebaseStorageService
  ) {

    this.lang = 'es'
    this.translate.setDefaultLang(this.lang);
    this.utils.setState({ loading: true });
    this.utils.getState().pipe(
      distinctUntilChanged(),
      tap(console.log)
    ).subscribe(state => {
      this.state = state;
      this.loading = state.loading
    });

    this.firebaseStore.getConf()
      .pipe(take(1))
      .subscribe((conf) => {
        this.configuration = conf[0];
        this.utils.updateState({ configuration: this.configuration  ,loading:false})
        if (this.utils.isApp) {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl('')
          
          // this.screenSizeService.isDesktopView().subscribe(isDesktop => {

          //   if (!isDesktop) {
          //     console.log('home')
          //     this.router.navigateByUrl('home')
          //   }

          //   if (!this.isDesktop && isDesktop) {
          //     this.router.navigateByUrl('');
          //   }
          //   this.isDesktop = isDesktop;
          // })
        }
      })

  }

  changeLang() {
    (this.lang) = this.lang === 'es' ? 'en' : 'es';
    this.translate.setDefaultLang(this.lang)
    this.utils.closeMenu();
  }

}


