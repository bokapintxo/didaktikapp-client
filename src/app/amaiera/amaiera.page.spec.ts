import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmaieraPage } from './amaiera.page';

describe('AmaieraPage', () => {
  let component: AmaieraPage;
  let fixture: ComponentFixture<AmaieraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AmaieraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
