// Mesmos campos do JSON da API (/api/cliente).
export interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  senha: string;
  logradouro: string;
  ativo: number;
}

export const clienteVazio = (): Cliente => ({
  codigo: 0,
  nome: '',
  email: '',
  telefone: '',
  documento: '',
  senha: '',
  logradouro: '',
  ativo: 0,
});
