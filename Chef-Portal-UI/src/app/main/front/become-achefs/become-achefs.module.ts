import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BecomeAChefsComponent } from './become-achefs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


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
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class BecomeAChefsModule { }
