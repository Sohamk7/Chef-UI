import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BecomeAChefsModule } from './become-achefs/become-achefs.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    BecomeAChefsModule
  ],
  exports: [RouterModule]
})
export class FrontModule { }
