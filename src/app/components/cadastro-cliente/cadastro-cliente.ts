import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente {
  nomeCompleto: string = '';
  email: string = '';
  telefone: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  erro: string = '';

  constructor(private router: Router) {}

  cadastrar(): void {
    if (!this.nomeCompleto || !this.email || !this.senha) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    // 1. Recupera os utilizadores já cadastrados ou cria um array vazio
    const usuarios = JSON.parse(localStorage.getItem('usuarios_cadastrados') || '[]');

    // 2. Verifica se o e-mail já existe
    const jaExiste = usuarios.find((u: any) => u.email === this.email);
    if (jaExiste) {
      this.erro = 'Este e-mail já está cadastrado.';
      return;
    }

    // 3. Adiciona o novo cliente à lista
    const novoCliente = {
      nomeCompleto: this.nomeCompleto,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    usuarios.push(novoCliente);

    // 4. Salva de volta no localStorage
    localStorage.setItem('usuarios_cadastrados', JSON.stringify(usuarios));

    this.erro = '';
    this.router.navigate(['/login']);
  }
}