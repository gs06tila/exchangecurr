import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import {CurrentValueComponent} from '../current-value/current-value.component';

@Component({
  selector: 'app-kt-auto-refresh',
  templateUrl: './kt-auto-refresh.component.html',
  styleUrls: ['./kt-auto-refresh.component.css']
})
export class KtAutoRefreshComponent implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime = 0.1;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  constructor(private ref: ChangeDetectorRef) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
  }
  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      let currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime);
      this.remainingTime = this.remainingTime / 1000;
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
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
