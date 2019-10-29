import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICurrentCurrency } from '../interfaces';

interface ICurrentExchangeDate {
  'Realtime Currency Exchange Rate': {
    '1. From_Currency Code': string,
    '2. From_Currency Name': string,
    '3. To_Currency Code': string,
    '4. To_Currency Name': string
    '5. Exchange Rate': string,
    '6. Last Refreshed': string,
    '8. Bid Price': string,
    '9. Ask Price': string
  };
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(private httpClient: HttpClient) { }

  getCurrentExchange(crypto: string, toCurrency: string) {
    return this.httpClient.get<ICurrentExchangeDate>(
      `${environment.baseUrl}function=CURRENCY_EXCHANGE_RATE&from_currency=${crypto}&to_currency=${toCurrency}&apikey=${environment.appId}`
    );
  }
}
