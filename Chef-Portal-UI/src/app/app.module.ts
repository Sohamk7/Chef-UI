import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './_services/dataservice';
import { LoaderAuthInterceptor } from './_helpers/auth.interceptor';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './main/material.module';
import { CurrencyPipe } from '@angular/common';
import { CalendarService } from './_services/calender.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [DataService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: LoaderAuthInterceptor,
      multi   : true,
    },
    CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
