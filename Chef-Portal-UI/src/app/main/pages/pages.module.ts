import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './authentication/login/login.module';
import { Error404Module } from './errors/404/error404/error404.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule,
    Error404Module
  ],
  exports: [RouterModule]
})
export class PagesModule { }
