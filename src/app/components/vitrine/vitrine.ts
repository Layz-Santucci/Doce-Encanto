import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { Cesta } from '../../models/cesta';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../service/produto-service';


@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine implements OnInit{
  mensagem : string = "";
  produtos: Produto[] = [];

  constructor(private service: ProdutoService) {}

  ngOnInit(){
    this.service.carregarVitrine().subscribe({
      next:(dados) =>{ //se der certo vamos realizar o proximo passo
        this.produtos = dados;
        if (this.produtos.length <=0) this.mensagem = "Não existem produtos na vitrine!";
      },
      error: (err) => {
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
      }
    })
  }
   
}
