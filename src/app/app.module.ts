import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrentValueComponent } from './current-value/current-value.component';
import { CurrencyService } from './currency/currency.service'

@NgModule({
  declarations: [
    AppComponent,
    CurrentValueComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
