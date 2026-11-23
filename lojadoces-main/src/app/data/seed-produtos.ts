import { Produto } from '../models/produto';
import produtos from './seed-produtos.json';

// Doces de exemplo (fonte única: seed-produtos.json, também usado por seed/seed.mjs no Docker).
// destaque > 0 → aparece na vitrine (na ordem do número); 0 → só em busca/"todos os produtos".
// A ordem importa: no banco do grupo os códigos ficaram 2…23 nesta ordem (o 1 era o exemplo do
// professor, já removido) e as fotos em public/doces/{codigo}.jpg seguem esses códigos.
export const SEED_PRODUTOS: Omit<Produto, 'codigo'>[] = produtos;
