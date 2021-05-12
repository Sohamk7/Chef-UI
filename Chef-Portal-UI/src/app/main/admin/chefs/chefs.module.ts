import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefsComponent } from './chefs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';


const routes = [
  {
      path     : 'chefs',
      component: ChefsComponent
  }
];

@NgModule({
  declarations: [
    ChefsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class ChefsModule { }
