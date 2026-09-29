import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidos implements OnInit {
  pedidos: any[] = [
    { id: 1001, data: '15/09/2026', status: 'Entregue', total: 29.50 },
    { id: 1002, data: '17/09/2026', status: 'Em preparo', total: 18.00 },
    { id: 1003, data: '19/09/2026', status: 'Enviado', total: 45.50 }
  ];

  ngOnInit(): void {
    // Busca os pedidos salvos no localStorage ao finalizar a compra
    const pedidosSalvos = localStorage.getItem('historico_pedidos');
    if (pedidosSalvos) {
      const novosPedidos = JSON.parse(pedidosSalvos);
      // Adiciona os novos pedidos no topo da lista
      this.pedidos = [...novosPedidos, ...this.pedidos];
    }
  }
}