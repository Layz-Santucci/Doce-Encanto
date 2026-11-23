# 🍬 Doce Encanto

Loja virtual de doces desenvolvida em **Angular 22** para a disciplina de Desenvolvimento Web (Fatec),
integrada à **API "lojinha"** do professor (Spring Boot + SQLite).

- Enunciado e material de aula: [professorNortonGlaser/desenvolvimentoWeb](https://github.com/professorNortonGlaser/desenvolvimentoWeb)
- Repositório: [Layz-Santucci/Doce-Encanto](https://github.com/Layz-Santucci/Doce-Encanto)

## 📁 Estrutura

```
Doce-Encanto/
├── README.md                ← este arquivo
├── CLAUDE.md                ← aponta para as regras do projeto (lojadoces-main/CLAUDE.md)
├── lojadoces-main/          ← PROJETO: front Angular + API + Docker
│   ├── docker-compose.yml   ← sobe API + front + doces de exemplo
│   ├── src/  public/        ← front (telas, composables, fotos)
│   ├── api/                 ← API do professor (cópia usada pelo Docker e pelo Java local)
│   ├── seed/                ← script dos doces de exemplo
│   ├── docs/specs/          ← especificação e status de cada módulo
│   └── README.md            ← guia completo do front (rotas, organização, testes)
└── lojinha/                 ← download original da API do professor (referência)
```

## 🚀 Início rápido (Docker)

```bash
git clone https://github.com/Layz-Santucci/Doce-Encanto
cd Doce-Encanto/lojadoces-main
docker compose up -d --build
```

| O quê | Onde |
|---|---|
| Loja | http://localhost:4200 |
| API | http://localhost:8081/api/produto/vitrine (~45 s para responder depois de subir) |

Na primeira vez o banco nasce vazio e o serviço `seed` cadastra **22 doces de exemplo** com fotos.
Desligar: `docker compose down` (os dados ficam em `lojadoces-main/api/data/`).

### Outras formas de subir

| Forma | Quando usar | Comandos (dentro de `lojadoces-main/`) |
|---|---|---|
| **Docker** | testar / apresentar | `docker compose up -d --build` |
| **Sem Docker** | sem Docker instalado | API: `cd api && SPRING_DATASOURCE_URL=jdbc:sqlite:data/lojinha.db ./mvnw spring-boot:run` (Java 21) · Front: `npm install && npm start` · Doces: `npm run seed` |
| **Misto** | desenvolver o front | `docker compose up -d api` + `npm start` |

Passo a passo completo (Java sem sudo, Windows, portas): [`lojadoces-main/README.md`](lojadoces-main/README.md#-como-executar).

## 🛍️ Funcionalidades

Telas pedidas no enunciado (PWEB_P1):

| Tela | Rota | API |
|---|---|---|
| Vitrine (destaques, promoção, comprar) | `/vitrine` | `GET /produto/vitrine` |
| Busca no topo de todas as telas | `/busca?q=termo` | `GET /produto/busca/{termo}` |
| Detalhe do produto | `/produto/:codigo` | `GET /produto/{codigo}` |
| Cesta (quantidade, total, limpar, finalizar) | `/cesta` | `POST /pedido` |
| Cadastro e login | `/cadastro` · `/login` | `POST /cliente` · `POST /cliente/login` |
| Esqueci / alterar senha | `/esqueci-senha` · `/alterar-senha` | `PATCH /cliente/resetarSenha` · `PATCH /cliente/alterarSenha` |
| Meus pedidos | `/pedidos` · `/pedido/:codigo` | `GET /pedido/{codigo}` |

Extras: busca enquanto digita (debounce, filtra pelo nome), diálogo de confirmação com a identidade da loja,
layout responsivo (Bootstrap), doces de exemplo automáticos e foto própria para cada produto.

## 🧱 Arquitetura (resumo)

- **Composables** (`useVitrine()`, `useCliente()`, `useCesta()`…) concentram as chamadas à API e devolvem *signals* —
  a tela atualiza sozinha (o Angular 22 do projeto é *zoneless*).
- Renderização só no navegador (`RenderMode.Client`), porque a loja usa `localStorage` (cesta e sessão).
- As peculiaridades da API (ex.: login exige `ativo = 1`, senha antiga vai no campo `documento`) ficam escondidas nos composables.

Decisões e armadilhas da API: [`lojadoces-main/CLAUDE.md`](lojadoces-main/CLAUDE.md) · Especificações: [`lojadoces-main/docs/specs/`](lojadoces-main/docs/specs/README.md)

## ✅ Testes

```bash
cd lojadoces-main
npx ng test --watch=false    # testes unitários (cesta, busca, diálogo, ações da API)
npx ng build                 # build de produção
```

## ⚠️ Observações

- Use **um** `docker-compose.yml`: o de `lojadoces-main/`. O de `lojinha/` é do download original e usa o mesmo
  nome de container da API (`lojinha-api`) — rodar os dois ao mesmo tempo dá conflito.
- O código Java da API é do professor e não é alterado; toda a integração é feita no front.

## 📸 Créditos

Fotos dos produtos: 4 do grupo e 18 do Wikimedia Commons (licenças livres) —
lista completa em [`lojadoces-main/CREDITOS-IMAGENS.md`](lojadoces-main/CREDITOS-IMAGENS.md).
