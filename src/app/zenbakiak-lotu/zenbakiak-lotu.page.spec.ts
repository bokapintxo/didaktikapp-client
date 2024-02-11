import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZenbakiakLotuPage } from './zenbakiak-lotu.page';

describe('ZenbakiakLotuPage', () => {
  let component: ZenbakiakLotuPage;
  let fixture: ComponentFixture<ZenbakiakLotuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ZenbakiakLotuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
