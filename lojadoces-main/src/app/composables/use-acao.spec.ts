import { of, throwError } from 'rxjs';
import { useAcao } from './use-acao';

describe('useAcao', () => {
  it('devolve o valor e volta enviando para false', async () => {
    const acao = useAcao((n: number) => of(n * 2));
    expect(await acao.executar(21)).toBe(42);
    expect(acao.enviando()).toBe(false);
    expect(acao.erro()).toBe('');
  });

  it('em erro devolve undefined e preenche a mensagem', async () => {
    const acao = useAcao(() => throwError(() => new Error('falhou')));
    expect(await acao.executar()).toBeUndefined();
    expect(acao.erro()).toBe('Ocorreu um erro, tente mais tarde!');
    expect(acao.enviando()).toBe(false);
  });
});
