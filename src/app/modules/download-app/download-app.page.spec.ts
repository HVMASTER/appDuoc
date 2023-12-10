import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadAppPage } from './download-app.page';

describe('DownloadAppPage', () => {
  let component: DownloadAppPage;
  let fixture: ComponentFixture<DownloadAppPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DownloadAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
