import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  lang: 'es' | 'en';

  constructor(
    private menu: MenuController,
    private translate: TranslateService
  ) {
    this.lang = 'es'
    this.translate.setDefaultLang(this.lang);
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


