import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BingoRolaPage } from './bingo-rola.page';

describe('BingoRolaPage', () => {
  let component: BingoRolaPage;
  let fixture: ComponentFixture<BingoRolaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BingoRolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
