import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HitzakLotuPage } from './hitzak-lotu.page';

describe('HitzakLotuPage', () => {
  let component: HitzakLotuPage;
  let fixture: ComponentFixture<HitzakLotuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HitzakLotuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
