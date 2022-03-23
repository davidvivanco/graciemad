import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { IonicModule } from '@ionic/angular';
import { DetailsComponent } from './details/details.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CalendarComponent,
    DetailsComponent
  ],
  exports:[
    CalendarComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ]
})
export class ComponentsModule { }
