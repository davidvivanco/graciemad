import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [DirectivesModule]
})
export class SharedModule { }
