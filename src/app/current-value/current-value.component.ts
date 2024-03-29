import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {ICurrentCurrency} from '../interfaces';
import {CurrencyService} from '../currency/currency.service';
import {Observable, Subscription, timer} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-current-value',
  templateUrl: './current-value.component.html',
  styleUrls: ['./current-value.component.css']
})

export class CurrentValueComponent implements OnInit {
  private current: ICurrentCurrency;
  private subscription: Subscription;
  crypto: string;
  toCurrency: string;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime = 1;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);

  constructor(private currencyService: CurrencyService, private ref: ChangeDetectorRef) {
    this.crypto = 'BTC';
    this.toCurrency = 'CNY';
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
  }

  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      const currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime);
      this.remainingTime = this.remainingTime / 1000;
      this.currencyService.getCurrentExchange(this.crypto, this.toCurrency).subscribe((data) => this.current = data);
      if (this.remainingTime <= 0) {
        this.SearchDate = moment();
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
        this.TimerExpired.emit();
      } else {
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
      }
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
