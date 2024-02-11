import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuzzleaPage } from './puzzlea.page';

describe('PuzzleaPage', () => {
  let component: PuzzleaPage;
  let fixture: ComponentFixture<PuzzleaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PuzzleaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
