import { computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { endpoints } from '../api/endpoints';
import { Produto } from '../models/produto';

/** Produtos em destaque (GET /produto/vitrine). */
export function useVitrine() {
  return httpResource<Produto[]>(() => endpoints.vitrine, { defaultValue: [] });
}

/** Minúsculas e sem acento: "Pavê" → "pave". */
export const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/** O nome contém todas as palavras digitadas? ("bolo cenoura" acha "Bolo de Cenoura…") */
export const nomeCombina = (nome: string, termo: string) => {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
  const alvo = normalizar(nome);
  return palavras.every(p => alvo.includes(p));
};

/**
 * Busca por termo; termo vazio lista todos (GET /produto/busca/{termo} ou /produtos).
 * A API também procura no descritivo ("brigadeiro" trazia Palha Italiana), então
 * aqui ficam só os produtos cujo NOME combina com o que foi digitado.
 */
export function useBuscaProdutos(termo: () => string) {
  // A API procura a frase inteira ("bolo cenoura" não acha "Bolo de Cenoura"):
  // pedimos pela palavra mais longa e o filtro abaixo confere as demais.
  const palavraPrincipal = () =>
    termo().trim().split(/\s+/).reduce((maior, p) => (p.length > maior.length ? p : maior), '');
  const res = httpResource<Produto[]>(
    () => (palavraPrincipal() ? endpoints.busca(palavraPrincipal()) : endpoints.produtos),
    { defaultValue: [] },
  );
  const produtos = computed(() => {
    const t = termo().trim();
    return t ? res.value().filter(p => nomeCombina(p.nome, t)) : res.value();
  });
  return { produtos, carregando: res.isLoading, erro: res.error };
}

/** Um produto pelo código (GET /produto/{codigo}). */
export function useProduto(codigo: () => number) {
  // Código inválido → undefined → nenhuma requisição.
  const res = httpResource<Produto>(() => (codigo() > 0 ? endpoints.produto(codigo()) : undefined));

  // A API responde 200 com codigo 0 quando o produto não existe.
  const produto = computed(() => {
    const p = res.hasValue() ? res.value() : undefined;
    return p && p.codigo > 0 ? p : null;
  });

  return {
    produto,
    carregando: res.isLoading,
    erro: res.error,
    naoEncontrado: computed(() => !res.isLoading() && !res.error() && !produto()),
  };
}
