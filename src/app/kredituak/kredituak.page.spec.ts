import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KredituakPage } from './kredituak.page';

describe('KredituakPage', () => {
  let component: KredituakPage;
  let fixture: ComponentFixture<KredituakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KredituakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
