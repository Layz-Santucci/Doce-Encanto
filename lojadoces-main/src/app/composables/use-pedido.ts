import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { ItemCesta } from '../models/item-cesta';
import { Pedido } from '../models/pedido';
import { gravarArmazenado, lerArmazenado } from './armazenamento';
import { useAcao } from './use-acao';

/** Grava o cabeçalho do pedido. A API responde "... sucesso! N" → devolve N. */
export function useGravarPedido() {
  const http = inject(HttpClient);
  return useAcao((p: Omit<Pedido, 'codigoPedido'>) =>
    http.post(endpoints.pedido, { ...p, codigoPedido: 0 }, { responseType: 'text' })
      .pipe(map(texto => Number(/(\d+)\s*$/.exec(texto)?.[1] ?? 0))));
}

/** Um pedido pelo código (GET /pedido/{codigo}); codigoPedido 0 = não existe. */
export function usePedido(codigo: () => number) {
  const res = httpResource<Pedido>(() => (codigo() > 0 ? endpoints.pedidoPor(codigo()) : undefined));
  const pedido = computed(() => {
    const p = res.hasValue() ? res.value() : undefined;
    return p && p.codigoPedido > 0 ? p : null;
  });
  return { pedido, carregando: res.isLoading, erro: res.error };
}

// A API não guarda itens nem lista pedidos: o histórico com os itens fica no navegador.
export interface PedidoRegistrado {
  codigoPedido: number;
  codigoCliente: number;
  dataPedido: string;
  valorTotal: number;
  itens: ItemCesta[];
}

@Injectable({ providedIn: 'root' })
export class PedidosStore {
  private readonly CHAVE = 'pedidos';
  readonly todos = signal<PedidoRegistrado[]>(lerArmazenado<PedidoRegistrado[]>(this.CHAVE, []));

  registrar(p: PedidoRegistrado) {
    this.todos.update(lista => [p, ...lista]);
    gravarArmazenado(this.CHAVE, this.todos());
  }

  doCliente(codigoCliente: number) {
    return this.todos().filter(p => p.codigoCliente === codigoCliente);
  }

  porCodigo(codigoPedido: number) {
    return this.todos().find(p => p.codigoPedido === codigoPedido) ?? null;
  }
}

export const usePedidosRegistrados = () => inject(PedidosStore);
