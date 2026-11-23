import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { useCliente } from '../../composables/use-cliente';
import { useSessao } from '../../composables/use-sessao';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private sessao = useSessao();
  api = useCliente();

  // Query params: ?cadastrado=1 (vindo do cadastro) e ?voltar=/cesta (vindo do finalizar)
  cadastrado = input<string | undefined>();
  voltar = input<string | undefined>();

  email = '';
  senha = '';
  erroForm = signal('');

  async fazerLogin() {
    this.erroForm.set('');
    if (!this.email || !this.senha) {
      this.erroForm.set('Preencha o e-mail e a senha.');
      return;
    }
    const cliente = await this.api.login.executar(this.email, this.senha);
    if (cliente) {
      this.sessao.entrar(cliente);
      this.router.navigateByUrl(this.voltar() ?? '/');
    } else if (!this.api.login.erro()) {
      // A API não diferencia senha errada de conta desativada (após "esqueci senha").
      this.erroForm.set('E-mail ou senha incorretos.');
    }
  }
}
