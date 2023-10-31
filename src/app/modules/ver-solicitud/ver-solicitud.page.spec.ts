import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerSolicitudPage } from './ver-solicitud.page';

describe('VerSolicitudPage', () => {
  let component: VerSolicitudPage;
  let fixture: ComponentFixture<VerSolicitudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerSolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
