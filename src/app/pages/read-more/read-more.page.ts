import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Configuration, ReadMoreType, State } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';



@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.page.html',
  styleUrls: ['./read-more.page.scss'],
})
export class ReadMorePage implements OnInit ,OnDestroy{
  type: ReadMoreType;
  subs: Subscription;
  state: Partial<State>;
  
  constructor(public utils: UtilsService) {
    this.subs = new Subscription();
    this.state = {};
   }

  ngOnInit() {
    this.subs.add(
      this.utils.getState().subscribe(state => {
        this.state = state;
      })
    )
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
