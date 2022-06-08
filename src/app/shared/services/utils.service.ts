import { Injectable } from '@angular/core';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { LoadingController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ReadMoreType, State } from '../interfaces';
import { StoreUtils } from '../classes/store';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ScrollContentService } from './scroll-content.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService extends StoreUtils<State> {
  readonly urlGoogleMaps: SafeResourceUrl;
  readonly urlFacebook: string;
  readonly urlInstagram: string;
  lang: 'es' | 'en';

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
    private iab: InAppBrowser,
    private translate: TranslateService,
    private menu: MenuController,
    private nav: NavController,
    public sanitizer: DomSanitizer,
    private scrollContent: ScrollContentService,
    private safariViewController: SafariViewController) {
    super();
    this.lang = 'es';
    this.urlFacebook = 'https://www.facebook.com/graciemadridbjj/';
    this.urlInstagram = 'https://www.instagram.com/gracie_madrid_academy/';
    this.urlGoogleMaps = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=icih%20ban%20alcala&t=&z=13&ie=UTF8&iwloc=&output=embed');

  }

  changeLang() {
    (this.lang) = this.lang === 'es' ? 'en' : 'es';
    this.translate.setDefaultLang(this.lang)
    this.closeMenu();
  }

  closeMenu() {
    this.menu.close('menu');
  }

  openUrl(url: string) {
    if (!url || url === '') return;
    return this.safariViewController
      .isAvailable()
      .catch(() => false)
      .then(available => {
        if (available) {
          this.openSafariUrl(url);
        } else {
          this.iab.create(encodeURI(url), '_system');
        }
      }
      )
      .catch(error => {
        console.log(this, 'Not able to open inAppBrowser', error);
      });
  }

  private openSafariUrl(url) {
    return this.safariViewController
      .show({
        url,
        hidden: false,
        animated: true,
        transition: 'curl',
        enterReaderModeIfAvailable: true,
        tintColor: '#d81e05'
      })
      .toPromise()
      .then(_ => { })
      .catch(error => {
        console.log(
          this,
          'Not able to open safari view controller, fallback to inAppBrowser',
          error
        );
        return this.iab.create(encodeURI(url), '_system');
      });
  }

  async openGallery(state: Partial<State>) {
    this.updateState({ ...state, loading: true })
    this.closeMenu();
    this.nav.navigateForward('gallery')
  }


  async navTo(path: string) {
    this.nav.navigateForward(path)
  }

  async openReadMore(type: ReadMoreType, state: Partial<State>) {
    this.updateState({ ...state, readMoreType: type })
    this.nav.navigateForward('read-more')
  }

  isSafari() {
    return (
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor)
    );
  }

  openFacebook() {
    this.openUrl(this.urlFacebook)
  }

  openInstagram() {
    this.openUrl(this.urlInstagram)
  }


  scrollToPoint(x: number) {
    this.closeMenu();
    console.log("sas")
    this.scrollContent.scrollTo(x)
  }

  async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string, color?: string) {
    const toast = await this.toastController.create({
      color: color || 'primary',
      duration: 2000,
      position: 'top',
      message,
    });

    await toast.present();
  }

  get isApp(): boolean {
    return (
      this.platform.is('cordova')
    );
  }

  /**
 * @description Indicates if the screen size corresponds to a tablet
 */
  get isTablet(): boolean {
    return this.platform.width() > 568;
  }

  /**
   * @description Indicates if the screen size corresponds to a desktop
   */
  get isDesktop(): boolean {
    return this.platform.width() > 960;
  }
}
