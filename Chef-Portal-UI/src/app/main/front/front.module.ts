import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BecomeAChefsModule } from './become-achefs/become-achefs.module';
import { SharedModule } from '../shared/shared.module';
import { CutomerSignupModule } from './customer-signup/customer-signup.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    BecomeAChefsModule,
    SharedModule,
    CutomerSignupModule
  ],
  exports: [RouterModule,SharedModule]
})
export class FrontModule { }
