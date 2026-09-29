import { ItemCesta } from './item-cesta';
 
export class Cesta {
  itens: ItemCesta[] = [];
 
  adicionarItem(item: ItemCesta): void {
    const existente = this.itens.find(i => i.idProduto === item.idProduto);
    if (existente) {
      existente.quantidade += item.quantidade;
    } else {
      this.itens.push(item);
    }
  }
 
  removerItem(idProduto: number): void {
    this.itens = this.itens.filter(i => i.idProduto !== idProduto);
  }
 
  atualizarQuantidade(idProduto: number, quantidade: number): void {
    const item = this.itens.find(i => i.idProduto === idProduto);
    if (item) {
      item.quantidade = quantidade;
    }
  }
 
  get quantidadeTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }
 
  get total(): number {
    return this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }
 
  esvaziar(): void {
    this.itens = [];
  }
}