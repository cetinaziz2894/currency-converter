import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertionHistoryPageComponent } from './convertion-history-page.component';

describe('ConvertionHistoryPageComponent', () => {
  let component: ConvertionHistoryPageComponent;
  let fixture: ComponentFixture<ConvertionHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertionHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertionHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
