import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaberintoaPage } from './laberintoa.page';

describe('LaberintoaPage', () => {
  let component: LaberintoaPage;
  let fixture: ComponentFixture<LaberintoaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LaberintoaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
