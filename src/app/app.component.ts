import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScreenSizeService } from './shared/services/screen-size.service';

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
  

  constructor(
    private menu: MenuController,
    private screenSizeService: ScreenSizeService,
    private router:Router,
    private translate: TranslateService
  ) {
    this.lang = 'es'
    this.translate.setDefaultLang(this.lang);
    this.screenSizeService.isDesktopView().subscribe(isDesktop => {

      if (!isDesktop) {
        this.router.navigateByUrl('home');
      }

      if (!this.isDesktop && isDesktop) {

        this.router.navigateByUrl('/home-web');

      }

 

      this.isDesktop = isDesktop;

 

    })
  }

  changeLang() {
    (this.lang) = this.lang === 'es' ? 'en' : 'es';
    this.translate.setDefaultLang(this.lang)
    this.closeMenu();
  }

  closeMenu() {
    this.menu.close('menu');
  }
}


