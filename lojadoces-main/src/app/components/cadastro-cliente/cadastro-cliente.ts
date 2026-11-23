import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { clienteVazio } from '../../models/cliente';
import { useCliente } from '../../composables/use-cliente';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente {
  private router = inject(Router);
  api = useCliente();

  dados = clienteVazio();
  confirmarSenha = '';
  erroForm = signal('');

  async cadastrar(form: NgForm) {
    this.erroForm.set('');
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.erroForm.set('Preencha os campos obrigatórios.');
      return;
    }
    if (this.dados.senha !== this.confirmarSenha) {
      this.erroForm.set('As senhas não coincidem.');
      return;
    }
    const documento = this.dados.documento.replace(/\D/g, ''); // CPF só com números
    if (documento.length !== 11) {
      this.erroForm.set('CPF deve ter 11 dígitos.');
      return;
    }

    // ativo: 1 é enviado pelo useCliente (sem ele o login da API recusa)
    const resposta = await this.api.cadastrar.executar({ ...this.dados, documento });
    if (resposta) this.router.navigate(['/login'], { queryParams: { cadastrado: 1 } });
  }
}
