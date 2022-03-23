import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  @Input() noShowGi: boolean;
  @Input() noShowGrappling: boolean;
  @Input() noShowMMA: boolean;

  constructor(
    public utils: UtilsService
  ) { }

  ngOnInit() { }

}
