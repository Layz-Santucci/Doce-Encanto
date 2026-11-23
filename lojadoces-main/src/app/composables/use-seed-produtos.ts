import { inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { Produto } from '../models/produto';
import { SEED_PRODUTOS } from '../data/seed-produtos';

export interface ResultadoSeed {
  criados: string[];
  jaExistiam: string[];
}

/** Envia os doces de exemplo para a API, pulando os que já existem (compara pelo nome). */
export function useSeedProdutos() {
  const http = inject(HttpClient);
  const enviando = signal(false);
  const erro = signal('');
  const resultado = signal<ResultadoSeed | null>(null);

  async function enviar() {
    enviando.set(true);
    erro.set('');
    resultado.set(null);
    try {
      const existentes = await firstValueFrom(http.get<Produto[]>(endpoints.produtos));
      const nomes = new Set(existentes.map(p => p.nome.trim().toLowerCase()));
      const res: ResultadoSeed = { criados: [], jaExistiam: [] };

      // Um por vez, para os códigos saírem na ordem da lista.
      for (const p of SEED_PRODUTOS) {
        if (nomes.has(p.nome.toLowerCase())) {
          res.jaExistiam.push(p.nome);
          continue;
        }
        await firstValueFrom(http.post(endpoints.novoProduto, { ...p, codigo: 0 }, { responseType: 'text' }));
        res.criados.push(p.nome);
      }
      resultado.set(res);
    } catch {
      erro.set('Ocorreu um erro, tente mais tarde! (a API está no ar?)');
    } finally {
      enviando.set(false);
    }
  }

  return {
    produtos: SEED_PRODUTOS,
    enviar,
    enviando: enviando.asReadonly(),
    erro: erro.asReadonly(),
    resultado: resultado.asReadonly(),
  };
}
