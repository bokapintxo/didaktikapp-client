import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BingoaPage } from './bingoa.page';

describe('BingoaPage', () => {
  let component: BingoaPage;
  let fixture: ComponentFixture<BingoaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BingoaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
