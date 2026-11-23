import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, skip } from 'rxjs';
import { useCesta } from '../../composables/use-cesta';
import { useSessao } from '../../composables/use-sessao';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './topo.html',
  styleUrl: './topo.css',
})
export class Topo {
  private router = inject(Router);
  cesta = useCesta();
  sessao = useSessao();
  termo = signal('');
  menuAberto = false;

  constructor() {
    // Busca enquanto digita: espera 400 ms sem teclar antes de pesquisar.
    toObservable(this.termo)
      .pipe(skip(1), map(t => t.trim()), debounceTime(400), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(t => this.pesquisar(t));
  }

  // Enter pesquisa na hora, sem esperar o debounce.
  buscarAgora() {
    this.pesquisar(this.termo().trim());
  }

  private pesquisar(termo: string) {
    const naBusca = this.router.url.startsWith('/busca');
    if (termo.length >= 2) {
      // replaceUrl: digitar não enche o histórico do "voltar" com cada letra
      this.router.navigate(['/busca'], { queryParams: { q: termo }, replaceUrl: naBusca });
    } else if (!termo && naBusca) {
      this.router.navigate(['/busca'], { replaceUrl: true }); // apagou tudo → todos os produtos
    }
  }

  sair() {
    this.sessao.sair();
    this.router.navigate(['/']);
  }
}
