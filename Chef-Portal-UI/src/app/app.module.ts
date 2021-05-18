import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './_services/dataservice';
import { LoaderAuthInterceptor } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: LoaderAuthInterceptor,
      multi   : true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
