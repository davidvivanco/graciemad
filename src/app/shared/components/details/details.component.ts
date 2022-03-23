import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @ViewChild('title') title;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.title = this.title.nativeElement;
    setTimeout(() => {
      this.title.classList.add("marking") 
    },400);
  }

  back(){
    this.modalController.dismiss();
  }

  

}
