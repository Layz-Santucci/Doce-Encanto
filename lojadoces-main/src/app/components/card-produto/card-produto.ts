import { Component, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto, fotoProduto } from '../../models/produto';
import { useCesta } from '../../composables/use-cesta';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  produto = input.required<Produto>();
  private cesta = useCesta();
  adicionado = signal(false);
  foto = fotoProduto;

  comprar() {
    this.cesta.adicionar(this.produto());
    this.adicionado.set(true);
    setTimeout(() => this.adicionado.set(false), 2000);
  }
}
