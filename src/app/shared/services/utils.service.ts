import { Injectable } from '@angular/core';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DetailsComponent } from '../components/details/details.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalController: ModalController,
    private iab: InAppBrowser,
    private safariViewController: SafariViewController) { }


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

  async openModalDetail() {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
