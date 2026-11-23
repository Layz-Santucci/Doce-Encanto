import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ResultadoBusca } from './resultado-busca';

describe('ResultadoBusca', () => {
  let component: ResultadoBusca;
  let fixture: ComponentFixture<ResultadoBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoBusca],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoBusca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
