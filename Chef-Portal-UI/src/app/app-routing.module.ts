import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './main/admin/admin.module';
import { FrontModule } from './main/front/front.module';
import { PagesModule } from './main/pages/pages.module';

const routes: Routes = [
  {
    path        : '',
    loadChildren: () => import('./main/front/front.module').then(m => m.FrontModule),
    pathMatch: 'full'
  },
  {
    path        : 'auth',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path        : 'admin',
    loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule)
  },
  // {
  //   path        : '**',
  //   redirectTo  : '/errors/error-404'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FrontModule,
    PagesModule,
    AdminModule
  ],
  exports: [
    RouterModule,
    FrontModule
  ]
})
export class AppRoutingModule { }
