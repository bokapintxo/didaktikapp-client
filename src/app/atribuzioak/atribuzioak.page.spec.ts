import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtribuzioakPage } from './atribuzioak.page';

describe('AtribuzioakPage', () => {
  let component: AtribuzioakPage;
  let fixture: ComponentFixture<AtribuzioakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtribuzioakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
