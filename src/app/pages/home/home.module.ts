import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import localeEs from '@angular/common/locales/es';
import { HomeComponentsModule } from './components/components.module';

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    ComponentsModule,
    SharedModule,
    HomeComponentsModule,
    GoogleMapsModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  declarations: [HomePage]
})
export class HomePageModule {}
