import { nomeCombina, normalizar } from './use-produtos';

describe('busca por nome', () => {
  it('ignora acento e maiúsculas', () => {
    expect(normalizar('  Pavê de Morango ')).toBe('pave de morango');
    expect(nomeCombina('Pavê de Morango', 'PAVE')).toBe(true);
  });

  it('só aceita quando o nome contém o termo (não o descritivo)', () => {
    expect(nomeCombina('Brigadeiro de Pistache', 'brigadeiro')).toBe(true);
    expect(nomeCombina('Palha Italiana', 'brigadeiro')).toBe(false);
    expect(nomeCombina('Coxinha de Morango', 'brigadeiro')).toBe(false);
  });

  it('aceita várias palavras fora de ordem', () => {
    expect(nomeCombina('Bolo de Cenoura com Chocolate (fatia)', 'cenoura bolo')).toBe(true);
    expect(nomeCombina('Bolo no Pote de Ninho', 'bolo cenoura')).toBe(false);
  });
});
