import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { useCliente } from '../../composables/use-cliente';
import { useSessao } from '../../composables/use-sessao';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './alterar-senha.html',
})
export class AlterarSenha {
  private router = inject(Router);
  private sessao = useSessao();
  api = useCliente();

  // ?email= vindo do "esqueci senha"; o campo continua editável.
  emailParam = input<string | undefined>(undefined, { alias: 'email' });
  email = linkedSignal(() => this.emailParam() ?? '');
  senhaAtual = '';
  novaSenha = '';
  confirmar = '';
  erroForm = signal('');

  async alterar() {
    this.erroForm.set('');
    if (!this.email() || !this.senhaAtual || !this.novaSenha) {
      this.erroForm.set('Preencha todos os campos.');
      return;
    }
    if (this.novaSenha.length < 6) {
      this.erroForm.set('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (this.novaSenha !== this.confirmar) {
      this.erroForm.set('As senhas não coincidem.');
      return;
    }

    const texto = await this.api.alterarSenha.executar(this.email(), this.senhaAtual, this.novaSenha);
    if (texto === undefined) return; // erro de rede já aparece em api.alterarSenha.erro()

    // A API sempre responde "sucesso": confirmamos tentando entrar com a nova senha.
    const cliente = await this.api.login.executar(this.email(), this.novaSenha);
    if (cliente) {
      this.sessao.entrar(cliente);
      this.router.navigate(['/']);
    } else {
      this.erroForm.set('E-mail ou senha atual incorretos.');
    }
  }
}
