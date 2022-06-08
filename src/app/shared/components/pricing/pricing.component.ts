import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Configuration } from '../../interfaces';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit, OnDestroy {
 
  conf: Configuration;
  subs: Subscription;
  flipped1: boolean;
  flipped2: boolean;
  flipped3: boolean;
  flipped4: boolean;
  flipped5: boolean;
  @Input() slideOpts:any;

  constructor(
    public utils: UtilsService
  ) {
    this.subs = new Subscription();
    this.flipped1 = false;
    this.flipped2 = false;
    this.flipped3 = false;
    this.flipped4 = false;
    this.flipped5 = false;
  }


  ngOnInit(): void {
    this.subs.add(
      this.utils.getState().subscribe(state => {
        if (state.configuration) this.conf = state.configuration;
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
