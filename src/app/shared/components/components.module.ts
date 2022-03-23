import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports:[
    CalendarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
