import { computed, inject, Injectable, signal } from '@angular/core';
import { Cliente } from '../models/cliente';
import { apagarArmazenado, gravarArmazenado, lerArmazenado } from './armazenamento';

export type ClienteLogado = Omit<Cliente, 'senha'>;

/** Cliente logado. A API devolve a senha no login: nunca guardamos. */
@Injectable({ providedIn: 'root' })
export class SessaoStore {
  private readonly CHAVE = 'cliente';
  readonly cliente = signal<ClienteLogado | null>(lerArmazenado<ClienteLogado | null>(this.CHAVE, null));
  readonly logado = computed(() => this.cliente() !== null);

  entrar(c: Cliente) {
    const { senha: _, ...semSenha } = c;
    gravarArmazenado(this.CHAVE, semSenha);
    this.cliente.set(semSenha);
  }

  sair() {
    apagarArmazenado(this.CHAVE);
    this.cliente.set(null);
  }
}

export const useSessao = () => inject(SessaoStore);
