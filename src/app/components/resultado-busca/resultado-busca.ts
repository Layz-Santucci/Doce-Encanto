import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

interface Produto {
  idProduto: number;
  nome: string;
  preco: number;
  imagem: string;
}

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrl: './resultado-busca.css',
  templateUrl: './resultado-busca.html'
})
export class ResultadoBusca implements OnInit {
  termo = '';

  produtos: Produto[] = [
    { idProduto: 1, nome: 'Brigadeiro Gourmet', preco: 3.50, imagem: 'doces/Brigadeiro.jpg' },
    { idProduto: 2, nome: 'Brownie de Chocolate', preco: 6.00, imagem: 'doces/Brownie.jpg' },
    { idProduto: 3, nome: 'Cupcake Recheado', preco: 7.50, imagem: 'doces/Cupcake.jpg' },
    { idProduto: 4, nome: 'Pavê de Morango', preco: 12.00, imagem: 'doces/Pavê .jpg' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.termo = params.get('q') || '';
    });
  }
}