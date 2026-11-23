import { inject, Injectable, signal } from '@angular/core';

export interface OpcoesConfirmacao {
  titulo: string;
  mensagem: string;
  confirmar?: string;  // texto do botão principal
  cancelar?: string;   // texto do botão secundário; vazio = só "OK" (vira um alerta)
  perigo?: boolean;    // ação destrutiva (ex.: esvaziar cesta) → botão vermelho
}

interface Pedido extends OpcoesConfirmacao {
  responder: (sim: boolean) => void;
}

/** Substitui o confirm()/alert() do navegador por um diálogo com a cara da loja. */
@Injectable({ providedIn: 'root' })
export class ConfirmacaoStore {
  readonly aberto = signal<Pedido | null>(null);

  perguntar(opcoes: OpcoesConfirmacao): Promise<boolean> {
    this.aberto()?.responder(false); // fecha um anterior, se houver
    return new Promise(resolve => this.aberto.set({ confirmar: 'Confirmar', cancelar: 'Cancelar', ...opcoes, responder: resolve }));
  }

  avisar(titulo: string, mensagem: string): Promise<boolean> {
    return this.perguntar({ titulo, mensagem, confirmar: 'OK', cancelar: '' });
  }

  responder(sim: boolean) {
    const atual = this.aberto();
    this.aberto.set(null);
    atual?.responder(sim);
  }
}

export const useConfirmacao = () => inject(ConfirmacaoStore);
