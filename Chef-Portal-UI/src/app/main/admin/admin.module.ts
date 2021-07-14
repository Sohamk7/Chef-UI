import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderService } from 'src/app/_services/loaderservice';
import { HomeComponent } from './home/home.component';
import { ChefsComponent } from './chefs/chefs.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin.component';
import { ChefsProfileComponent } from './chefs-profile/chefs-profile.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MenuComponent } from './menu/menu.component';
import { EditProfileChefComponent } from './edit-profile-chef/edit-profile-chef/edit-profile-chef.component';
import { ChefsListForProductComponent } from './chefs-list-for-product/chefs-list-for-product.component';
import { ChefListForMenuComponent } from './chef-list-for-menu/chef-list-for-menu.component';
import { OrderOfChefComponent } from './order-of-chef/order-of-chef.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { CalendarService } from 'src/app/_services/calender.service';
import { ChefPaymentComponent } from './chef-payment/chef-payment.component';

const routes = [
  {
    path     : '',
    component: AdminComponent,
      children : [
        {
          path     : 'home',
          component: HomeComponent,
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
          component: OrderComponent
        },
        {
          path : 'product',
          component : ChefsListForProductComponent
        },
        {
          path: 'menu',
          component : ChefListForMenuComponent
        },
        {
          path : 'OrderOfChef',
          component : OrderOfChefComponent
        },
        {
          path : 'schedules',
          component: SchedulesComponent,
          resolve  : {
            events: CalendarService,
          }
        },
        {
          path: 'ChefPayment',
          component : ChefPaymentComponent
        },
        {
          path : 'productBychefId/:id',
          component : ProductListComponent
        },
        {
          path: 'menuByChefid/:id',
          component : MenuComponent
        },
        {
          path     : 'profile/:id',
          component: ChefsProfileComponent
        },
        {
          path     : 'edit-profile-chef/:id',
          component: EditProfileChefComponent
        }
      ]
  }
];


@NgModule({
  declarations: [
    AdminComponent,
    CustomersComponent,
    HomeComponent,
    OrderComponent,
    ChefsComponent,
    ChefsProfileComponent,
    ProductListComponent,
    MenuComponent,
    EditProfileChefComponent,
    ChefsListForProductComponent,
    ChefListForMenuComponent,
    OrderOfChefComponent,
    SchedulesComponent,
    ChefPaymentComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [LoaderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
