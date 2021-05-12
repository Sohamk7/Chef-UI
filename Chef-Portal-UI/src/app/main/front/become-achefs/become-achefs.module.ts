import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BecomeAChefsComponent } from './become-achefs.component';
import { RouterModule } from '@angular/router';


const routes = [
  {
      path     : 'become-chefs',
      component: BecomeAChefsComponent
  }
];

@NgModule({
  declarations: [BecomeAChefsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class BecomeAChefsModule { }
