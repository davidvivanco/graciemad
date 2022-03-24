import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-class',
  templateUrl: './details-class.component.html',
  styleUrls: ['./details-class.component.scss'],
})
export class DetailsClassComponent implements OnInit {
  @ViewChild('title') title;

  constructor(public modalController: ModalController) { }

  noShowGi: boolean
  noShowGrappling: boolean
  noShowMMA: boolean

  ngOnInit() {
    console.log(this.noShowGi)
  }

  ngAfterViewInit(): void {
    this.title = this.title.nativeElement;
    setTimeout(() => {
      this.title.classList.add("marking")
    }, 400);
  }

  back() {
    this.modalController.dismiss();
  }



}
