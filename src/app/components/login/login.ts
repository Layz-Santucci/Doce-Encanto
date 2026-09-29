import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private router: Router) {}

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha o e-mail e a senha.';
      return;
    }

    const usuarios = JSON.parse(
      localStorage.getItem('usuarios_cadastrados') || '[]'
    );

    const usuarioEncontrado = usuarios.find(
      (u: any) => u.email === this.email && u.senha === this.senha
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioEncontrado));
      this.erro = '';
      this.router.navigate(['/']);
    } else {
      this.erro = 'E-mail ou senha incorretos, ou conta não cadastrada!';
    }
  }
}