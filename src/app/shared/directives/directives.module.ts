import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeHeaderDirective } from './fade-home.directive';
import { FadeHeaderDirectiveDesktop } from './fade-home.directive-desktop';
import { ParallaxDirective } from './parallax.directive';



@NgModule({
  declarations: [
    FadeHeaderDirective,
    FadeHeaderDirectiveDesktop,
    ParallaxDirective
  ],
  exports: [
    FadeHeaderDirective,
    FadeHeaderDirectiveDesktop,
    ParallaxDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
