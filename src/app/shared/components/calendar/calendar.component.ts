import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {

  day: number;
  
  constructor(
    public utils: UtilsService
  ) { 
    this.day = new Date().getDay();
  }

}
