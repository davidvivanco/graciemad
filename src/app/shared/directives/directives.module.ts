import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeHeaderDirective } from './fade-home.directive';
import { ParallaxDirective } from './parallax.directive';



@NgModule({
  declarations: [
    FadeHeaderDirective,
    ParallaxDirective
  ],
  exports: [
    FadeHeaderDirective,
    ParallaxDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
