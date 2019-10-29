import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICurrentCurrency } from '../interfaces';
import { map } from 'rxjs/operators';

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

  getCurrentExchange(crypto: string, toCurrency: string): Observable<ICurrentCurrency> {
    return this.httpClient.get<ICurrentExchangeDate>(
      `${environment.baseUrl}function=CURRENCY_EXCHANGE_RATE&from_currency=${crypto}&to_currency=${toCurrency}&apikey=${environment.appId}`
    ).pipe(
      map(data =>
        CurrencyService.transformToICurrentCurrency(data)
      )
    );
  }

  private static transformToICurrentCurrency(data: ICurrentExchangeDate): ICurrentCurrency {
    return {
      '1. From_Currency Code': data['Realtime Currency Exchange Rate']['1. From_Currency Code'],
      '2. From_Currency Name': data['Realtime Currency Exchange Rate']['2. From_Currency Name'],
      '3. To_Currency Code': data['Realtime Currency Exchange Rate']['3. To_Currency Code'],
      '4. To_Currency Name': data['Realtime Currency Exchange Rate']['4. To_Currency Name'],
      '5. Exchange Rate': data['Realtime Currency Exchange Rate']['5. Exchange Rate'],
      '6. Last Refreshed': data['Realtime Currency Exchange Rate']['6. Last Refreshed'],
      '8. Bid Price': data['Realtime Currency Exchange Rate']['8. Bid Price'],
      '9. Ask Price': data['Realtime Currency Exchange Rate']['9. Ask Price']
    };
  }

  /*getCurrentExchange(crypto: string, toCurrency: string) {
    return this.httpClient.get<ICurrentExchangeDate>(
      `${environment.baseUrl}function=CURRENCY_EXCHANGE_RATE&from_currency=${crypto}&to_currency=${toCurrency}&apikey=${environment.appId}`
    );
  }*/
}
