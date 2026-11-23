import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EsqueciSenha } from './esqueci-senha';

describe('EsqueciSenha', () => {
  let component: EsqueciSenha;
  let fixture: ComponentFixture<EsqueciSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsqueciSenha],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EsqueciSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
