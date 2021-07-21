import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';

const routes = [
  {
      path     : '',
      component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FooterModule
  ]
})
export class HomeModule { }
