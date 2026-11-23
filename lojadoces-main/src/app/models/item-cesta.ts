import { Produto, precoFinal } from './produto';

export interface ItemCesta {
  produto: Produto;
  qtd: number;
}

// Valor do item já considerando a promoção.
export const valorItem = (item: ItemCesta): number => item.qtd * precoFinal(item.produto);
