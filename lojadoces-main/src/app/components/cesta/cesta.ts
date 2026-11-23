import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { valorItem } from '../../models/item-cesta';
import { fotoProduto, precoFinal } from '../../models/produto';
import { useCesta } from '../../composables/use-cesta';
import { useSessao } from '../../composables/use-sessao';
import { useGravarPedido, usePedidosRegistrados } from '../../composables/use-pedido';
import { useConfirmacao } from '../../composables/use-confirmacao';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  styleUrl: './cesta.css',
  templateUrl: './cesta.html'
})
export class Cesta {
  private router = inject(Router);
  cesta = useCesta();
  private sessao = useSessao();
  private pedidos = usePedidosRegistrados();
  gravarPedido = useGravarPedido();
  private confirmacao = useConfirmacao();

  valorItem = valorItem;
  precoFinal = precoFinal;
  foto = fotoProduto;

  async limpar() {
    const sim = await this.confirmacao.perguntar({
      titulo: 'Esvaziar a cesta?',
      mensagem: 'Todos os itens serão removidos.',
      confirmar: 'Esvaziar',
      perigo: true,
    });
    if (sim) this.cesta.limpar();
  }

  async finalizar() {
    const cliente = this.sessao.cliente();
    if (!cliente) {
      this.router.navigate(['/login'], { queryParams: { voltar: '/cesta' } });
      return;
    }

    const itens = this.cesta.itens();
    const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.cesta.total());
    const sim = await this.confirmacao.perguntar({
      titulo: 'Finalizar pedido?',
      mensagem: `${this.cesta.quantidadeTotal()} item(ns) · total ${total}\nEntrega: ${cliente.logradouro || 'retirada na loja'}`,
      confirmar: 'Finalizar pedido',
      cancelar: 'Voltar',
    });
    if (!sim) return;

    const pedido = {
      codigoCliente: cliente.codigo,
      valorTotal: this.cesta.total(),
      dataPedido: new Date().toLocaleDateString('sv-SE'), // data local 'YYYY-MM-DD' (java.sql.Date)
      entrega: cliente.logradouro || 'Retirada na loja',
      // A API não guarda itens: o resumo vai no campo obs.
      obs: itens.map(i => `${i.qtd}x ${i.produto.nome}`).join('; '),
    };

    const codigoPedido = await this.gravarPedido.executar(pedido);
    if (!codigoPedido) return; // erro já aparece em gravarPedido.erro()

    this.pedidos.registrar({ codigoPedido, ...pedido, itens });
    this.cesta.limpar();
    this.router.navigate(['/pedido', codigoPedido]);
  }
}
