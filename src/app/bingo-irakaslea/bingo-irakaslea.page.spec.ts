import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BingoIrakasleaPage } from './bingo-irakaslea.page';

describe('BingoIrakasleaPage', () => {
  let component: BingoIrakasleaPage;
  let fixture: ComponentFixture<BingoIrakasleaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BingoIrakasleaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
