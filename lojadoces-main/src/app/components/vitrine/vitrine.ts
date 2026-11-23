import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardProduto } from '../card-produto/card-produto';
import { useVitrine } from '../../composables/use-produtos';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, CardProduto],
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine {
  vitrine = useVitrine();
}
