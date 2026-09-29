import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-esqueci-senha',
  styleUrl: './esqueci-senha.css',
  templateUrl: './esqueci-senha.html',
})
export class EsqueciSenha {
  email = '';
  enviado = false;

  reenviarSenha(): void {
    if (!this.email) { return; }
    this.enviado = true;
  }
}

