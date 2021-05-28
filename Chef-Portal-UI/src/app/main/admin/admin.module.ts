import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { CreateMenuComponent } from './menus/create-menu/create-menu.component';


@NgModule({
  declarations: [
    CreateProductComponent,
    EditProfileComponent,
    CreateMenuComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [RouterModule]
})
export class AdminModule { }
