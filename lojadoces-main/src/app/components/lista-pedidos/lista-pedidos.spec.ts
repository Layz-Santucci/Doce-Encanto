import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListaPedidos } from './lista-pedidos';

describe('ListaPedidos', () => {
  let component: ListaPedidos;
  let fixture: ComponentFixture<ListaPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPedidos],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
