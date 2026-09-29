import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Cesta as CestaModel } from '../../models/cesta';
import { ItemCesta } from '../../models/item-cesta';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
  styleUrl: './cesta.css',
  templateUrl: './cesta.html'
})
export class Cesta implements OnInit {
  cesta: CestaModel = new CestaModel();

  constructor(private router: Router) {} 

  ngOnInit(): void {
    const itensSalvos = localStorage.getItem('cesta_doces');
    
    if (itensSalvos) {
      const parsed = JSON.parse(itensSalvos);
      this.cesta.itens = parsed.map((i: any) => {
        let imagemDoce = i.imagem;
        if (!imagemDoce) {
          if (i.idProduto === 1) imagemDoce = 'doces/Brigadeiro.jpg';
          else if (i.idProduto === 2) imagemDoce = 'doces/Brownie.jpg';
          else if (i.idProduto === 3) imagemDoce = 'doces/Cupcake.jpg';
          else if (i.idProduto === 4) imagemDoce = 'doces/Pavê .jpg';
          else imagemDoce = 'doces/Brigadeiro.jpg';
        }
        return new ItemCesta(i.idProduto, i.nome, i.preco, i.quantidade, imagemDoce);
      });
    } else {
      // Começa totalmente vazia  após finalizar o pedido
      this.cesta.itens = [];
    }
  }
  aumentar(item: ItemCesta): void {
    this.cesta.atualizarQuantidade(item.idProduto, item.quantidade + 1);
    this.salvarStorage();
  }

  diminuir(item: ItemCesta): void {
    if (item.quantidade > 1) {
      this.cesta.atualizarQuantidade(item.idProduto, item.quantidade - 1);
      this.salvarStorage();
    }
  }

  remover(item: ItemCesta): void {
    this.cesta.removerItem(item.idProduto);
    this.salvarStorage();
  }

  salvarStorage(): void {
    localStorage.setItem('cesta_doces', JSON.stringify(this.cesta.itens));
  }

  finalizarPedido(): void {
    if (this.cesta.itens.length === 0) return;
    const historico = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');
    const idNovo = 1004 + historico.length;
    const pedido = {
      id: idNovo,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Em preparo',
      total: this.cesta.total,
      itens: JSON.parse(JSON.stringify(this.cesta.itens))
    };
    historico.unshift(pedido);
    localStorage.setItem('historico_pedidos', JSON.stringify(historico));
    this.cesta.itens = [];
    localStorage.removeItem('cesta_doces');
    this.router.navigate(['/pedidos']);
  }
}