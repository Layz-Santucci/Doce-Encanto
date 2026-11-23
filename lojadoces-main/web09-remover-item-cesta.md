# web09 - Remover item da cesta (Doce Encanto)

Atividade: usando o exemplo dado em aula (https://github.com/professorNortonGlaser/desenvolvimentoWeb/blob/main/web09.zip), criar uma função dentro do model `Cesta.ts` para remover o item da lista quando clicar no X da cesta-detalhe.

Repositório: https://github.com/Layz-Santucci/Doce-Encanto

> Os nomes de propriedades (`id`, `nome`, `preco`, `quantidade`) e os caminhos são sugestões. Ajuste-os aos nomes que existem no seu projeto.

---

## 1. `src/app/models/cesta.ts`

```typescript
export interface ItemCesta {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export class Cesta {
  itens: ItemCesta[] = [];

  constructor() {
    this.carregarDoStorage();
  }

  /** Remove o item da lista pelo id e atualiza o localStorage */
  removerItem(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
    this.salvarNoStorage();
  }

  private salvarNoStorage(): void {
    localStorage.setItem('cesta', JSON.stringify(this.itens));
  }

  private carregarDoStorage(): void {
    const dados = localStorage.getItem('cesta');
    this.itens = dados ? JSON.parse(dados) : [];
  }
}
```

---

## 2. `src/app/cesta-detalhe/cesta-detalhe.component.ts`

```typescript
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
```

---

## 3. `src/app/cesta-detalhe/cesta-detalhe.component.html`

```html
<ul>
  <li *ngFor="let item of cesta.itens">
    <span>{{ item.nome }} - {{ item.quantidade }}x</span>
    <button type="button" class="btn-remover" (click)="removerItem(item)" title="Remover item">
      X
    </button>
  </li>
</ul>
```

---

## Como enviar ao GitHub

```bash
git clone https://github.com/Layz-Santucci/Doce-Encanto
cd Doce-Encanto
# substitua os arquivos acima pelos do seu projeto e então:
git add .
git commit -m "feat: adiciona remoção de itens da cesta pelo botão X"
git push origin main
```

Depois, cole a URL do repositório no campo **"Meu trabalho"** da atividade.
