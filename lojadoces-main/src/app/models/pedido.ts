// Mesmos campos do JSON da API (/api/pedido). A API não guarda os itens do pedido.
export interface Pedido {
  codigoPedido: number;
  codigoCliente: number;
  valorTotal: number;
  dataPedido: string; // 'YYYY-MM-DD'
  entrega: string;
  obs: string;
}
