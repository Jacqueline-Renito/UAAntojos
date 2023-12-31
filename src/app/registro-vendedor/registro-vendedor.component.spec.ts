import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVendedorComponent } from './registro-vendedor.component';

describe('RegistroVendedorComponent', () => {
  let component: RegistroVendedorComponent;
  let fixture: ComponentFixture<RegistroVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
