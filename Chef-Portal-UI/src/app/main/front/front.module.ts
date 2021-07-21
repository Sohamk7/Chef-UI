import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { BecomeAChefsModule } from './become-achefs/become-achefs.module';
import { SharedModule } from '../shared/shared.module';
import { FooterModule } from './footer/footer.module';
import { CutomerSignupModule } from './customer-signup/customer-signup.module';
import { ViewChefsComponent } from './view-chefs/view-chefs.component';

@NgModule({
  declarations: [
  
    ViewChefsComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    BecomeAChefsModule,
    SharedModule,
    FooterModule,
    CutomerSignupModule
  ],
  exports: [RouterModule,SharedModule]
})
export class FrontModule { }
