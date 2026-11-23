// Mesmos campos do JSON da API (/api/produto).
export interface Produto {
  codigo: number;
  nome: string;
  descritivo: string;
  valor: number;
  valorPromo: number;
  quantidade: number;
  destaque: number;
}

// Regra da aula: se tem promoção, vale o valor promocional.
export const precoFinal = (p: Produto): number => (p.valorPromo > 0 ? p.valorPromo : p.valor);

// Foto pelo nome (não pelo código): "Pavê de Morango" → doces/pave-de-morango.jpg.
// Assim a foto certa aparece em qualquer banco, mesmo que os códigos sejam outros.
export const slug = (texto: string): string =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const fotoProduto = (p: Pick<Produto, 'nome'>): string => `doces/${slug(p.nome)}.jpg`;
