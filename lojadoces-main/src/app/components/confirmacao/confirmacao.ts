import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { useConfirmacao } from '../../composables/use-confirmacao';

// Diálogo global (fica no app.html). Abre via useConfirmacao().perguntar(...).
@Component({
  selector: 'app-confirmacao',
  standalone: true,
  templateUrl: './confirmacao.html',
  styleUrl: './confirmacao.css',
  host: { '(document:keydown.escape)': 'fecharComEsc()' },
})
export class Confirmacao {
  dialogo = useConfirmacao();
  private botaoConfirmar = viewChild<ElementRef<HTMLButtonElement>>('confirmar');

  constructor() {
    // Foco no botão principal ao abrir (teclado: Enter confirma, Esc cancela).
    effect(() => {
      if (this.dialogo.aberto()) queueMicrotask(() => this.botaoConfirmar()?.nativeElement.focus());
    });
  }

  fecharComEsc() {
    if (this.dialogo.aberto()) this.dialogo.responder(false);
  }
}
