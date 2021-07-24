import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChefsComponent } from './view-chefs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { NgImageSliderModule } from 'ng-image-slider';

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
    MaterialModule,
    NgImageSliderModule
  ]
})
export class ViewChefsModule { }
