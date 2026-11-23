import { RenderMode, ServerRoute } from '@angular/ssr';

// Renderiza só no navegador: a loja usa localStorage (cesta/sessão) e dados da API em tempo real.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
