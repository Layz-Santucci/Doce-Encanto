const API = 'http://localhost:8081/api';

// Único lugar com as URLs da API lojinha.
export const endpoints = {
  vitrine: `${API}/produto/vitrine`,
  produtos: `${API}/produtos`,
  novoProduto: `${API}/produto`,
  produto: (codigo: number) => `${API}/produto/${codigo}`,
  busca: (termo: string) => `${API}/produto/busca/${encodeURIComponent(termo)}`,

  cliente: `${API}/cliente`,
  login: `${API}/cliente/login`,
  resetarSenha: `${API}/cliente/resetarSenha`,
  alterarSenha: `${API}/cliente/alterarSenha`,

  pedido: `${API}/pedido`,
  pedidoPor: (codigo: number) => `${API}/pedido/${codigo}`,
};
