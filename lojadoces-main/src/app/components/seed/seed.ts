import { Component, isDevMode } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { useSeedProdutos } from '../../composables/use-seed-produtos';

// Página de apoio ao desenvolvimento (não aparece no menu): popula a API com doces de exemplo.
@Component({
  selector: 'app-seed',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './seed.html',
})
export class Seed {
  dev = isDevMode();
  seed = useSeedProdutos();
}
