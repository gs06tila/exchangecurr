import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KtAutoRefreshComponent } from './kt-auto-refresh.component';

describe('KtAutoRefreshComponent', () => {
  let component: KtAutoRefreshComponent;
  let fixture: ComponentFixture<KtAutoRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KtAutoRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KtAutoRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
