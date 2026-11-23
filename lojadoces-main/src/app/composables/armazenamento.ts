// Acesso ao localStorage num só lugar (cesta, sessão e pedidos).
// O "typeof" protege caso algum código rode fora do navegador.

export function lerArmazenado<T>(chave: string, padrao: T): T {
  if (typeof localStorage === 'undefined') return padrao;
  try {
    const json = localStorage.getItem(chave);
    return json ? (JSON.parse(json) as T) : padrao;
  } catch {
    return padrao; // JSON corrompido → começa do zero
  }
}

export function gravarArmazenado(chave: string, valor: unknown): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(chave, JSON.stringify(valor));
}

export function apagarArmazenado(chave: string): void {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(chave);
}
