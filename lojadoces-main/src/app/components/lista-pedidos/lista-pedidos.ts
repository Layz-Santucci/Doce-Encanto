import { Component, computed } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { useSessao } from '../../composables/use-sessao';
import { usePedidosRegistrados } from '../../composables/use-pedido';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidos {
  sessao = useSessao();
  private registrados = usePedidosRegistrados();

  // A API não lista pedidos: usamos o histórico deste navegador, filtrado pelo cliente logado.
  pedidos = computed(() => {
    const cliente = this.sessao.cliente();
    return cliente ? this.registrados.doCliente(cliente.codigo) : [];
  });
}
