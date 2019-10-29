import { Component, OnInit } from '@angular/core';
import {ICurrentCurrency} from '../interfaces';
import {CurrencyService} from '../currency/currency.service';

@Component({
  selector: 'app-current-value',
  templateUrl: './current-value.component.html',
  styleUrls: ['./current-value.component.css']
})
export class CurrentValueComponent implements OnInit {
  current: ICurrentCurrency;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getCurrentExchange('BTC', 'SEK')
      .subscribe((data) => this.current = data['Realtime Currency Exchange Rate']);
  }

}
