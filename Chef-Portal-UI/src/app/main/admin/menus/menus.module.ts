import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusComponent } from './menus.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : 'menus',
      component: MenusComponent
  }
];

@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MenusModule { }
