import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CustomerSignupComponent } from './customer-signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes = [
  {
      path     : 'customer-signup',
      component: CustomerSignupComponent
  }
];


@NgModule({
  declarations: [
    CustomerSignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CutomerSignupModule { }