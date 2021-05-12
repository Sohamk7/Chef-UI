import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from '../material.module';
import { HomeModule } from './home/home.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { MenusModule } from './menus/menus.module';
import { RouterModule } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { ChefsModule } from './chefs/chefs.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomersModule,
    ChefsModule,
    DashboardModule,
    RouterModule,
    MaterialModule,
    HomeModule,
    MenusModule,
    OrdersModule,
    ProductsModule,
    ProfileModule,
    SchedulesModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
