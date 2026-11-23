import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { CadastroCliente } from './cadastro-cliente';

describe('CadastroCliente', () => {
  let component: CadastroCliente;
  let fixture: ComponentFixture<CadastroCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCliente],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
