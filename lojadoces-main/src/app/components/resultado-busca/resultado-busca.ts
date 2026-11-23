import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardProduto } from '../card-produto/card-produto';
import { useBuscaProdutos } from '../../composables/use-produtos';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [RouterLink, CardProduto],
  styleUrl: './resultado-busca.css',
  templateUrl: './resultado-busca.html'
})
export class ResultadoBusca {
  // ?q=termo da URL (withComponentInputBinding); ausente → lista todos.
  q = input<string | undefined>();
  termo = computed(() => (this.q() ?? '').trim());
  busca = useBuscaProdutos(() => this.termo());
}
