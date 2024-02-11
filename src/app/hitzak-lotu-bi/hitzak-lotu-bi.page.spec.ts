import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HitzakLotuBiPage } from './hitzak-lotu-bi.page';

describe('HitzakLotuBiPage', () => {
  let component: HitzakLotuBiPage;
  let fixture: ComponentFixture<HitzakLotuBiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HitzakLotuBiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
