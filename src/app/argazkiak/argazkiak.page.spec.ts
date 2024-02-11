import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArgazkiakPage } from './argazkiak.page';

describe('ArgazkiakPage', () => {
  let component: ArgazkiakPage;
  let fixture: ComponentFixture<ArgazkiakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArgazkiakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
