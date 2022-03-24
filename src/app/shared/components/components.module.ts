import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { IonicModule } from '@ionic/angular';
import { DetailsComponent } from './details/details.component';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsClassComponent } from './details-class/details-class.component';

@NgModule({
  declarations: [
    CalendarComponent,
    DetailsComponent,
    DetailsClassComponent
  ],
  exports:[
    CalendarComponent,
    DetailsComponent,
    DetailsClassComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ]
})
export class ComponentsModule { }
