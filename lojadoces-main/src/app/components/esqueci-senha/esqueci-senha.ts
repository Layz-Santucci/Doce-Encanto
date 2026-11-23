import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { useCliente } from '../../composables/use-cliente';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-esqueci-senha',
  styleUrl: './esqueci-senha.css',
  templateUrl: './esqueci-senha.html',
})
export class EsqueciSenha {
  api = useCliente();
  email = '';
  resposta = signal(''); // texto devolvido pela API

  async reenviarSenha() {
    if (!this.email) return;
    const texto = await this.api.resetarSenha.executar(this.email);
    if (texto) this.resposta.set(texto);
  }
}
