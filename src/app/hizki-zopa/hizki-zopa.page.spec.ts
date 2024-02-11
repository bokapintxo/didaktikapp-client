import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HizkiZopaPage } from './hizki-zopa.page';

describe('HizkiZopaPage', () => {
  let component: HizkiZopaPage;
  let fixture: ComponentFixture<HizkiZopaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HizkiZopaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
