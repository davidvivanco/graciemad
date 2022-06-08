import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMobileComponent } from './home-mobile/home-mobile.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeWebComponent } from './home-web/home-web.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
  ],
  declarations: [
    HomeWebComponent,
    HomeMobileComponent
  ],
  exports:[
    HomeWebComponent,
    HomeMobileComponent
  ]
})
export class HomeComponentsModule { }
