import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeHeaderDirective } from './fade-home.directive';



@NgModule({
  declarations: [
    FadeHeaderDirective
  ],
  exports:[
    FadeHeaderDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
