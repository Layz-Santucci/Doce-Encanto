import { computed, inject, Injectable, signal } from '@angular/core';
import { Cesta } from '../models/cesta';
import { ItemCesta } from '../models/item-cesta';
import { Produto } from '../models/produto';
import { apagarArmazenado, gravarArmazenado, lerArmazenado } from './armazenamento';

/** Estado único da cesta, compartilhado por topo, cards, detalhe e tela da cesta. */
@Injectable({ providedIn: 'root' })
export class CestaStore {
  private readonly CHAVE = 'cesta';
  readonly itens = signal<ItemCesta[]>(lerArmazenado<ItemCesta[]>(this.CHAVE, []));
  readonly total = computed(() => new Cesta(this.itens()).total);
  readonly quantidadeTotal = computed(() => new Cesta(this.itens()).quantidadeTotal);

  constructor() {
    apagarArmazenado('cesta_doces'); // chave do modelo antigo
  }

  adicionar(produto: Produto, qtd = 1) { this.aplicar(c => c.adicionarItem(produto, qtd)); }
  remover(codigo: number) { this.aplicar(c => c.removerItem(codigo)); }
  alterarQtd(codigo: number, qtd: number) { this.aplicar(c => c.alterarQtd(codigo, qtd)); }
  limpar() { this.aplicar(c => c.esvaziar()); }

  private aplicar(regra: (c: Cesta) => void) {
    const cesta = new Cesta(this.itens());
    regra(cesta);
    this.itens.set(cesta.itens);
    gravarArmazenado(this.CHAVE, cesta.itens);
  }
}

export const useCesta = () => inject(CestaStore);
