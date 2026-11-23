import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topo } from './components/topo/topo';
import { Rodape } from './components/rodape/rodape';
import { Confirmacao } from './components/confirmacao/confirmacao';

@Component({
  standalone: true,
  imports: [RouterOutlet, Topo, Rodape, Confirmacao],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
