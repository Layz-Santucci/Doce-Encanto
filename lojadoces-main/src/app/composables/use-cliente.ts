import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { Cliente } from '../models/cliente';
import { useAcao } from './use-acao';

/** Ações de cliente na API. As respostas de escrita da API são texto, não JSON. */
export function useCliente() {
  const http = inject(HttpClient);
  const texto = { responseType: 'text' as const };

  return {
    // O login da API só aceita ativo = 1, e o padrão no Java é 0.
    cadastrar: useAcao((c: Cliente) =>
      http.post(endpoints.cliente, { ...c, codigo: 0, ativo: 1 }, texto)),

    // PUT sobrescreve o registro inteiro: mandar o cliente completo.
    alterar: useAcao((c: Cliente) => http.put(endpoints.cliente, c, texto)),

    // Login inválido volta com codigo 0 → null.
    login: useAcao((email: string, senha: string) =>
      http.post<Cliente>(endpoints.login, { email, senha })
        .pipe(map(c => (c.codigo > 0 ? c : null)))),

    // Grava senha 'Senha1234' e desativa a conta até alterarSenha.
    resetarSenha: useAcao((email: string) =>
      http.patch(endpoints.resetarSenha, { email }, texto)),

    // A API recebe a senha antiga no campo "documento".
    alterarSenha: useAcao((email: string, senhaAntiga: string, novaSenha: string) =>
      http.patch(endpoints.alterarSenha, { email, senha: novaSenha, documento: senhaAntiga }, texto)),
  };
}
