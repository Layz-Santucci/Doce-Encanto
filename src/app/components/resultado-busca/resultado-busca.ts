import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../service/produto-service';



@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrl: './resultado-busca.css',
  templateUrl: './resultado-busca.html'
})
export class ResultadoBusca implements OnInit {
  termo: string = '';
  produtos: Produto[] = [];
  mensagem: string = '';

constructor(private route: ActivatedRoute, private service: ProdutoService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.termo = params.get('q') || '';
      this.carregarProdutos();
    });
  }

  carregarProdutos(): void {
    this.mensagem = '';

    const requisicao = this.termo
    ? this.service.fazerBusca(this.termo)
    : this.service.carregarVitrine();

    requisicao.subscribe({
      next:(dados) => {
        this.produtos = dados;
        if (this.produtos.length === 0){
          this.mensagem = 'Nenhum produto encontrado.';
        }
      },
      error: () => {
        this.mensagem = 'Ocorreu um erro, tente mais tarde!';
      }
    });
  }
}