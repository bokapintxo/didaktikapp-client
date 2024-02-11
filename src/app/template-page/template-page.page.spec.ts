import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplatePagePage } from './template-page.page';

describe('TemplatePagePage', () => {
  let component: TemplatePagePage;
  let fixture: ComponentFixture<TemplatePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TemplatePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
