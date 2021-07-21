import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChefsComponent } from './view-chefs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

const routes = [
  {
      path     : 'view-chefs',
      component: ViewChefsComponent
  }
];

@NgModule({
  declarations: [
    ViewChefsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class ViewChefsModule { }
