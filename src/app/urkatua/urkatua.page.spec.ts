import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UrkatuaPage } from './urkatua.page';

describe('UrkatuaPage', () => {
  let component: UrkatuaPage;
  let fixture: ComponentFixture<UrkatuaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UrkatuaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
