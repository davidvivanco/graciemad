import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('logo') logo: ElementRef;


  constructor(
    private nav: NavController
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.logo)
    setTimeout(() => {
      this.logo.nativeElement.style.setProperty('display', 'block');
      setTimeout(() => {
        this.nav.navigateForward('home')
      }, 2000);
    }, 1000);
  }


}
