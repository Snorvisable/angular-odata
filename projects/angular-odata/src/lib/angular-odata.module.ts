import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataFactory } from './angular-odata.factory';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ODataInterceptor } from './angular-odata.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ODataFactory,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ODataInterceptor,
      multi: true
    }
  ]
})
export class AngularODataModule { }
