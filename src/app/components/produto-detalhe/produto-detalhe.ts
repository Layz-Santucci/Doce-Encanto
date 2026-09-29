import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // 1. Importado o Router

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css'
})
export class ProdutoDetalhe implements OnInit {
  produto: any = {};
  quantidade: number = 1;
  mensagemSucesso: boolean = false; // Controla se o aviso aparece

  private produtosLista = [
    { idProduto: 1, nome: 'Brigadeiro Gourmet', preco: 3.50, descricao: 'Brigadeiro artesanal feito com chocolate belga e cobertura de granulado nobre.', imagem: 'doces/Brigadeiro.jpg' },
    { idProduto: 2, nome: 'Brownie de Chocolate', preco: 6.00, descricao: 'Brownie húmido por dentro, crocante por fora e feito com puro cacau.', imagem: 'doces/Brownie.jpg' },
    { idProduto: 3, nome: 'Cupcake Recheado', preco: 7.50, descricao: 'Cupcake fofinho com recheio cremoso e cobertura de chantilly.', imagem: 'doces/Cupcake.jpg' },
    { idProduto: 4, nome: 'Pavê de Morango', preco: 12.00, descricao: 'Camadas de creme suave, biscoito e morangos frescos selecionados.', imagem: 'doces/Pavê .jpg' }
  ];

  constructor(private route: ActivatedRoute) {} // Já não precisa do Router aqui se não for redirecionar

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const encontrado = this.produtosLista.find(p => p.idProduto === id);
      if (encontrado) {
        this.produto = encontrado;
      }
    }
  }

  adicionarNaCesta(): void {
    const cestaAtual = JSON.parse(localStorage.getItem('cesta_doces') || '[]');
    const index = cestaAtual.findIndex((item: any) => item.idProduto === this.produto.idProduto);

    if (index > -1) {
      cestaAtual[index].quantidade += this.quantidade;
    } else {
      cestaAtual.push({
        idProduto: this.produto.idProduto,
        nome: this.produto.nome,
        preco: this.produto.preco,
        quantidade: this.quantidade,
        imagem: this.produto.imagem
      });
    }

    localStorage.setItem('cesta_doces', JSON.stringify(cestaAtual));

    // Mostra a mensagem de sucesso na tela
    this.mensagemSucesso = true;

    // Esconde a mensagem automaticamente após 3 segundos
    setTimeout(() => {
      this.mensagemSucesso = false;
    }, 3000);
  }
}