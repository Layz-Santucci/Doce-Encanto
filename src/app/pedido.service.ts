import { Injectable } from '@angular/core';

export interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface Pedido {
  id: number;
  data: string;
  status: string;
  itens: ItemPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [
    {
      id: 1001,
      data: '15/09/2026',
      status: 'Entregue',
      itens: [
        { nome: 'Brigadeiro Gourmet', quantidade: 5, preco: 3.5 },
        { nome: 'Brownie de Chocolate', quantidade: 2, preco: 6.0 }
      ]
    },
    {
      id: 1002,
      data: '17/09/2026',
      status: 'Em preparo',
      itens: [
        { nome: 'Bolo no Pote de Ninho', quantidade: 1, preco: 12.0 },
        { nome: 'Coxinha de Morango', quantidade: 2, preco: 3.0 }
      ]
    },
    {
      id: 1003,
      data: '19/09/2026',
      status: 'Enviado',
      itens: [
        { nome: 'Torta de Limão (Fatia)', quantidade: 3, preco: 8.5 },
        { nome: 'Trufa Tradicional', quantidade: 5, preco: 4.0 }
      ]
    }
  ];

  // Retorna todos os pedidos com o total calculado dinamicamente
  getPedidos() {
    return this.pedidos.map(pedido => ({
      ...pedido,
      total: this.calcularTotal(pedido.itens)
    }));
  }

  // Busca um pedido específico pelo ID
  getPedidoPorId(id: string | number) {
    const pedido = this.pedidos.find(p => p.id.toString() === id.toString());
    if (!pedido) return null;
    
    return {
      ...pedido,
      total: this.calcularTotal(pedido.itens)
    };
  }

  // Função auxiliar para calcular o total
  private calcularTotal(itens: ItemPedido[]): number {
    return itens.reduce((soma, item) => soma + item.quantidade * item.preco, 0);
  }
}