export interface ItemCesta {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export class Cesta {
  itens: ItemCesta[] = [];

  constructor() {
    this.carregarDoStorage();
  }

  /** Remove o item da lista pelo id e atualiza o localStorage */
  removerItem(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
    this.salvarNoStorage();
  }

  private salvarNoStorage(): void {
    localStorage.setItem('cesta', JSON.stringify(this.itens));
  }

  private carregarDoStorage(): void {
    const dados = localStorage.getItem('cesta');
    this.itens = dados ? JSON.parse(dados) : [];
  }
}
