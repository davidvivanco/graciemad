import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule
  ],
  exports: [DirectivesModule]
})
export class SharedModule { }
