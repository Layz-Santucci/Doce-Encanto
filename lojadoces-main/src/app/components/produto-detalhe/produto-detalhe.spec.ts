import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProdutoDetalhe } from './produto-detalhe';

describe('ProdutoDetalhe', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
