import { signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

/**
 * Envolve uma chamada de escrita na API (POST/PUT/PATCH) e expõe
 * `enviando()` e `erro()` como signals para a tela.
 */
export function useAcao<A extends unknown[], R>(fazer: (...args: A) => Observable<R>) {
  const enviando = signal(false);
  const erro = signal('');

  async function executar(...args: A): Promise<R | undefined> {
    enviando.set(true);
    erro.set('');
    try {
      return await firstValueFrom(fazer(...args));
    } catch {
      erro.set('Ocorreu um erro, tente mais tarde!');
      return undefined;
    } finally {
      enviando.set(false);
    }
  }

  return { executar, enviando: enviando.asReadonly(), erro: erro.asReadonly() };
}
