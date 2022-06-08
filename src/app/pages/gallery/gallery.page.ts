import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(
    public utils: UtilsService
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.utils.getState().pipe(take(1)).subscribe(state => {
      this.utils.updateState({ ...state, loading: false })
    })
  }

}
