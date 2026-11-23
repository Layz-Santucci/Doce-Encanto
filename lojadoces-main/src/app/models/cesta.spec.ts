import { Cesta } from './cesta';
import { Produto, fotoProduto } from './produto';

const produto = (codigo: number, valor: number, valorPromo = 0, quantidade = 10): Produto =>
  ({ codigo, nome: `p${codigo}`, descritivo: '', valor, valorPromo, quantidade, destaque: 0 });

describe('Cesta', () => {
  it('soma a quantidade quando o produto já está na cesta', () => {
    const c = new Cesta();
    c.adicionarItem(produto(1, 3.5));
    c.adicionarItem(produto(1, 3.5), 2);
    expect(c.itens.length).toBe(1);
    expect(c.itens[0].qtd).toBe(3);
  });

  it('usa o valor promocional no total', () => {
    const c = new Cesta();
    c.adicionarItem(produto(1, 6, 5), 2);
    c.adicionarItem(produto(2, 3.5));
    expect(c.total).toBe(13.5);
    expect(c.quantidadeTotal).toBe(3);
  });

  it('remove o item e respeita o estoque', () => {
    const c = new Cesta();
    c.adicionarItem(produto(1, 1, 0, 2), 5);
    expect(c.itens[0].qtd).toBe(2);
    c.alterarQtd(1, 0);
    expect(c.itens.length).toBe(0);
  });

  it('não adiciona produto sem estoque', () => {
    const c = new Cesta();
    c.adicionarItem(produto(1, 1, 0, 0));
    expect(c.itens.length).toBe(0);
  });
});

describe('fotoProduto', () => {
  it('usa o nome sem acento como arquivo', () => {
    expect(fotoProduto({ nome: 'Pavê de Morango' })).toBe('doces/pave-de-morango.jpg');
    expect(fotoProduto({ nome: 'Torta de Limão (fatia)' })).toBe('doces/torta-de-limao-fatia.jpg');
  });
});
