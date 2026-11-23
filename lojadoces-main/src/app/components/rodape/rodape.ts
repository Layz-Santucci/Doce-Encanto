import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  standalone: true,
  template: `
    <footer class="py-4 footer-vitrine text-white text-center mt-auto">
      <p class="mb-0">&copy; 2026 Doce Encanto — Todos os direitos reservados</p>
    </footer>
  `,
  styles: `.footer-vitrine { background-color: var(--marrom-choco); }`,
})
export class Rodape {}
