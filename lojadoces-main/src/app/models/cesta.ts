import { Produto } from './produto';
import { ItemCesta, valorItem } from './item-cesta';

// Regras da cesta (sem Angular): quem guarda e mostra é o CestaStore.
export class Cesta {
  itens: ItemCesta[];

  constructor(itens: ItemCesta[] = []) {
    this.itens = itens.map(i => ({ ...i }));
  }

  adicionarItem(produto: Produto, qtd = 1): void {
    const existente = this.itens.find(i => i.produto.codigo === produto.codigo);
    if (existente) {
      this.alterarQtd(produto.codigo, existente.qtd + qtd);
    } else if (produto.quantidade > 0) {
      this.itens.push({ produto, qtd: Math.min(qtd, produto.quantidade) });
    }
  }

  // Atividade web09: remover o item ao clicar no X.
  removerItem(codigo: number): void {
    this.itens = this.itens.filter(i => i.produto.codigo !== codigo);
  }

  // Menos de 1 remove; não passa do estoque do produto.
  alterarQtd(codigo: number, qtd: number): void {
    if (qtd < 1) {
      this.removerItem(codigo);
      return;
    }
    this.itens = this.itens.map(i =>
      i.produto.codigo === codigo ? { ...i, qtd: Math.min(qtd, i.produto.quantidade) } : i);
  }

  esvaziar(): void {
    this.itens = [];
  }

  get total(): number {
    return this.itens.reduce((soma, i) => soma + valorItem(i), 0);
  }

  get quantidadeTotal(): number {
    return this.itens.reduce((soma, i) => soma + i.qtd, 0);
  }
}
