import { Routes } from '@angular/router';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';
import { Login } from './components/login/login';
import { Cesta } from './components/cesta/cesta';
import { EsqueciSenha } from './components/esqueci-senha/esqueci-senha';
import { AlterarSenha } from './components/alterar-senha/alterar-senha';
import { ListaPedidos } from './components/lista-pedidos/lista-pedidos';
import { DetalhePedido } from './components/detalhe-pedido/detalhe-pedido';
import { ResultadoBusca } from './components/resultado-busca/resultado-busca';
import { CadastroCliente } from './components/cadastro-cliente/cadastro-cliente';
import { Vitrine } from './components/vitrine/vitrine';
import { Seed } from './components/seed/seed';

export const routes: Routes = [
    { path: '', redirectTo: 'vitrine', pathMatch: 'full'},
    { path: 'vitrine', component: Vitrine },
    { path: 'busca', component: ResultadoBusca },
    { path: 'produto/:codigo', component: ProdutoDetalhe },
    { path: 'cesta', component: Cesta },
    { path: 'login', component: Login },
    { path: 'cadastro', component: CadastroCliente },
    { path: 'esqueci-senha', component: EsqueciSenha },
    { path: 'alterar-senha', component: AlterarSenha },
    { path: 'pedidos', component: ListaPedidos },
    { path: 'pedido/:codigo', component: DetalhePedido },
    { path: 'seed', component: Seed }, // apoio ao desenvolvimento (fora do menu)
    { path: '**', redirectTo: 'vitrine' }
];
