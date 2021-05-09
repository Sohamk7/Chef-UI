import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from './schedules.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : 'schedules',
      component: SchedulesComponent
  }
];

@NgModule({
  declarations: [
    SchedulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class SchedulesModule { }
