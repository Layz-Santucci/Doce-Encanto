import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ProdutoVitrine {
  idProduto: number;
  nome: string;
  preco: number;
  imagem: string;
}

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  produtos: ProdutoVitrine[] = [
    { idProduto: 1, nome: 'Brigadeiro Gourmet', preco: 3.50, imagem: 'doces/Brigadeiro.jpg' },
    { idProduto: 2, nome: 'Brownie de Chocolate', preco: 6.00, imagem: 'doces/Brownie.jpg' },
    { idProduto: 3, nome: 'Cupcake Recheado', preco: 7.50, imagem: 'doces/Cupcake.jpg' },
    { idProduto: 4, nome: 'Pavê de Morango', preco: 12.00, imagem: 'doces/Pavê .jpg' }
  ];
}