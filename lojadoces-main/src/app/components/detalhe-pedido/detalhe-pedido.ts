import { Component, computed, input, numberAttribute } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { valorItem } from '../../models/item-cesta';
import { usePedido, usePedidosRegistrados } from '../../composables/use-pedido';

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css'
})
export class DetalhePedido {
  // /pedido/:codigo (withComponentInputBinding)
  codigo = input(0, { transform: numberAttribute });

  // Dados oficiais (data, total, obs) vêm da API; os itens só existem no histórico local.
  api = usePedido(() => this.codigo());
  private registrados = usePedidosRegistrados();
  itens = computed(() => this.registrados.porCodigo(this.codigo())?.itens ?? []);

  valorItem = valorItem;
}
