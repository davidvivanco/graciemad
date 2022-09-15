import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
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
    this.screenSizeService.onResize(e.target.innerWidth);
  }

  lang: 'es' | 'en';
  configuration: Configuration;
  loading: boolean;
  state: Partial<State>;
  constructor(
    public utils: UtilsService,
    private meta: Meta,
    private screenSizeService: ScreenSizeService,
    private router: Router,
    private translate: TranslateService,
    private firebaseStore: FirebaseStorageService
  ) {
    this.meta.addTags(
      [
        { name: 'description', content: 'Gracie Madrid. Academia de Jiu-jitsu y MMA. Escuela dirigida por Agustín Mesa alumno directo de Robin Gracie' },
        { name: 'keywords', content: 'gracie madrid graciemadrid robin gracie jiu-jitsu, jiujitsu mmas' }  
      ]);
    this.lang = 'es';
    this.translate.setDefaultLang(this.lang);
    this.utils.setState({ loading: true });
    this.utils.getState().pipe(
      distinctUntilChanged(),
      tap(console.log)
    ).subscribe(state => {
      this.state = state;
      this.loading = state.loading;
    });

    this.firebaseStore.getConf()
      .pipe(take(1))
      .subscribe((conf) => {
        this.configuration = conf[0];
        this.utils.updateState({ configuration: this.configuration, loading: false });
        if (this.utils.isApp) {
          // this.router.navigateByUrl('admin');
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('');

        }
      });

  }

  changeLang() {
    (this.lang) = this.lang === 'es' ? 'en' : 'es';
    this.translate.setDefaultLang(this.lang);
    this.utils.closeMenu();
  }

}


