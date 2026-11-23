import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DetalhePedido } from './detalhe-pedido';

describe('DetalhePedido', () => {
  let component: DetalhePedido;
  let fixture: ComponentFixture<DetalhePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhePedido],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
