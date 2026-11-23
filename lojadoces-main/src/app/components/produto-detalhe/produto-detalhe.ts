import { Component, inject, input, numberAttribute } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { useProduto } from '../../composables/use-produtos';
import { fotoProduto } from '../../models/produto';
import { useCesta } from '../../composables/use-cesta';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css'
})
export class ProdutoDetalhe {
  private router = inject(Router);
  private cesta = useCesta();

  // /produto/:codigo (withComponentInputBinding)
  codigo = input(0, { transform: numberAttribute });
  detalhe = useProduto(() => this.codigo());
  quantidade = 1;
  foto = fotoProduto;

  comprar() {
    const produto = this.detalhe.produto();
    if (!produto) return;
    this.cesta.adicionar(produto, Math.max(1, this.quantidade));
    this.router.navigate(['/cesta']); // PDF: COMPRAR → CESTA
  }
}
