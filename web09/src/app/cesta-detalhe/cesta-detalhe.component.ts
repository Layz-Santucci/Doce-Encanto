import { Component } from '@angular/core';
import { Cesta, ItemCesta } from '../models/cesta';

@Component({
  selector: 'app-cesta-detalhe',
  templateUrl: './cesta-detalhe.component.html',
  styleUrls: ['./cesta-detalhe.component.css']
})
export class CestaDetalheComponent {
  cesta = new Cesta();

  /** Chamado ao clicar no X */
  removerItem(item: ItemCesta): void {
    this.cesta.removerItem(item.id);
  }
}
