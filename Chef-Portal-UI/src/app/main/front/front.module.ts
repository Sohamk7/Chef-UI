import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BecomeAChefsModule } from './become-achefs/become-achefs.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    BecomeAChefsModule,
    SharedModule
  ],
  exports: [RouterModule,SharedModule]
})
export class FrontModule { }
