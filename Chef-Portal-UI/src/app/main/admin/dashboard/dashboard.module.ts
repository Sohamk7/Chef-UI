import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { HomeComponent } from '../home/home.component';
import { MenusComponent } from '../menus/menus.component';
import { ChefsComponent } from '../chefs/chefs.component';
import { CustomersComponent } from '../customers/customers.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { ProfileComponent } from '../profile/profile.component';
import { SchedulesComponent } from '../schedules/schedules.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarService } from 'src/app/_services/calender.service';
import { MenuService } from 'src/app/_services/menu.service';

const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
      children : [
        {
          path     : 'home',
          component: HomeComponent,
        },
        {
          path     : 'menus',
          component: MenusComponent,
          resolve  : {
            chat: MenuService
          }
        },
        {
          path     : 'chefs',
          component: ChefsComponent
        },
        {
          path     : 'customers',
          component: CustomersComponent
        },
        {
          path     : 'orders',
          component: OrdersComponent
        },
        {
          path     : 'products',
          component: ProductsComponent
        },
        {
          path     : 'profile',
          component: ProfileComponent
        },
        {
          path     : 'schedules',
          component: SchedulesComponent,
          resolve  : {
            events: CalendarService,
          }
        }
      ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MenusComponent,
    ChefsComponent,
    CustomersComponent,
    OrdersComponent,
    ProductsComponent,
    ProfileComponent,
    SchedulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AngularCalendarModule.forRoot({
      provide   : DateAdapter,
      useFactory: adapterFactory
  }),
  ],
  exports: [RouterModule],
  providers: [CalendarService,MenuService]
})
export class DashboardModule { }
