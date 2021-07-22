import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

const routes = [
  {
    path     : '',
    component: CustomerDashboardComponent,
      children : [
      ]
  }
];

@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class CustomerDashboardModule { }
