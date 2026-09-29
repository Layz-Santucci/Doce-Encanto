import { Routes } from '@angular/router';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';
import { Login } from './components/login/login';
import { Cesta } from './components/cesta/cesta';
import { EsqueciSenha } from './components/esqueci-senha/esqueci-senha';
import { ListaPedidos } from './components/lista-pedidos/lista-pedidos';
import { DetalhePedido } from './components/detalhe-pedido/detalhe-pedido';
import { ResultadoBusca } from './components/resultado-busca/resultado-busca';
import { CadastroCliente } from './components/cadastro-cliente/cadastro-cliente';
import { Vitrine } from './components/vitrine/vitrine';

export const routes: Routes = [
    { path: '', redirectTo: 'vitrine', pathMatch: 'full'},
    { path: 'produto/:id', component: ProdutoDetalhe },
    { path: 'login', component: Login },
    { path: 'cesta', component: Cesta },
    { path: 'esqueci-senha', component: EsqueciSenha },
    { path: 'pedidos', component: ListaPedidos },
    { path: 'pedido/:id', component: DetalhePedido },
    { path: 'busca', component: ResultadoBusca },
    { path: 'cadastro', component: CadastroCliente },
    { path: 'vitrine', component: Vitrine}
];
