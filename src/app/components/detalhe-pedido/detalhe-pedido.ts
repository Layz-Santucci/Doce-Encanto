import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css'
})
export class DetalhePedido implements OnInit {
  pedido: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const idPedido = Number(idParam);

    // Pedidos 
    const pedidosFixos = [
      { id: 1001, data: '15/09/2026', status: 'Entregue', total: 29.50, itens: [{ nome: 'Brigadeiro Gourmet', quantidade: 2, preco: 3.50 }, { nome: 'Brownie de Chocolate', quantidade: 3, preco: 6.00 }] },
      { id: 1002, data: '17/09/2026', status: 'Em preparo', total: 18.00, itens: [{ nome: 'Cupcake Recheado', quantidade: 2, preco: 7.50 }] },
      { id: 1003, data: '19/09/2026', status: 'Enviado', total: 45.50, itens: [{ nome: 'Pavê de Morango', quantidade: 1, preco: 12.00 }] }
    ];

    //  Busca os pedidos salvos no localStorage, onde estão as novas compras
    const pedidosSalvos = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');

    // Junta ambos para garantir que qualquer ID seja encontrado
    const todosOsPedidos = [...pedidosSalvos, ...pedidosFixos];

    // Localiza o pedido correspondente ao ID da URL
    this.pedido = todosOsPedidos.find((p: any) => p.id === idPedido);
  }
}