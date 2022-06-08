import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeminarFormComponent } from './seminar-form/seminar-form.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    CalendarComponent,
    PricingComponent,
    ContactComponent,
    SeminarFormComponent,
  ],
  exports: [
    CalendarComponent,
    PricingComponent,
    ContactComponent,
    SeminarFormComponent,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
})
export class ComponentsModule { }
