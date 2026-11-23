# Doce Encanto 🍬


Projeto de e-commerce desenvolvido com *Angular*.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o *Node.js* e o *npm* instalados em sua máquina.

### 📥 Instalando o Node.js (Caso não tenha)
Se você ainda não possui o Node.js, você pode instalá-lo de duas formas:
* *Site Oficial:* Baixe e instale a versão LTS recomendada diretamente em [nodejs.org](https://nodejs.org/).
* *NVM (Node Version Manager - Recomendado para gerenciar múltiplas versões):*
  * *Linux/macOS:*
```bash
    curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash
```

  * *Windows:* Utilize o [nvm-windows](https://github.com/coreybutler/nvm-windows).

Para verificar se você já os possui, execute no seu terminal:
```bash
node -v
npm -v
```

## 🚀 Como executar

```bash
git clone https://github.com/Layz-Santucci/Doce-Encanto
cd Doce-Encanto/lojadoces-main     # o projeto fica nesta subpasta do repositório
```

O repositório traz tudo: o front Angular, a **API do professor** (`api/`, Spring Boot + SQLite) e os **doces de exemplo**.

| Parte | Porta | Pasta |
|---|---|---|
| Front (Angular) | 4200 | raiz (`src/`, `public/`) |
| API (lojinha) | 8081 | `api/` — banco em `api/data/lojinha.db` (fora do git) |

### Opção 1 — Tudo no Docker (recomendado para testar)

Requer Docker com Compose.

```bash
docker compose up -d --build     # primeira vez (ou depois de mudar código)
docker compose up -d             # das próximas vezes
```

- Front: http://localhost:4200
- API: http://localhost:8081/api/produto/vitrine (leva ~45s para responder depois de subir)
- O serviço `seed` cadastra os doces de exemplo sozinho e encerra (banco novo → 22 doces).

| Pra quê | Comando |
|---|---|
| Ver status | `docker compose ps` |
| Logs | `docker compose logs -f front` · `docker compose logs -f api` |
| Desligar | `docker compose down` |
| Rebuild só do front | `docker compose up -d --build front` |
| Rodar o seed de novo | `docker compose up seed` |

> No Docker o front roda o **build de produção** (sem recarregar ao salvar e sem a página `/seed`).

### Opção 2 — Tudo sem Docker

**API** (precisa de **Java 21**):

- Ubuntu/WSL com sudo: `sudo apt install -y openjdk-21-jdk`
- Sem sudo: baixe o JDK 21 da [Adoptium (Temurin)](https://adoptium.net), extraia numa pasta sua e use
  `export JAVA_HOME=~/.local/jdks/jdk-21 PATH=$JAVA_HOME/bin:$PATH`
- Na primeira vez o `mvnw` baixa o Maven e as dependências (~1 min). Se aparecer *Permission denied*: `chmod +x mvnw`.


```bash
cd api
SPRING_DATASOURCE_URL=jdbc:sqlite:data/lojinha.db ./mvnw spring-boot:run
# Windows (PowerShell): $env:SPRING_DATASOURCE_URL="jdbc:sqlite:data/lojinha.db"; .\mvnw.cmd spring-boot:run
```

A variável aponta para o mesmo banco usado no Docker (`api/data/lojinha.db`; crie a pasta `api/data` se não existir).

**Front** (precisa de Node 22.22+), em outro terminal:

```bash
npm install
npm start                        # http://localhost:4200 (recarrega ao salvar)
npm run seed                     # doces de exemplo (com a API no ar)
```

### Opção 3 — Misto (recomendado para desenvolver)

API no Docker, front com recarga automática:

```bash
docker compose up -d api         # só a API
npm start                        # front em modo dev
npm run seed                     # se o banco estiver vazio
```

Se o container do front estiver rodando, pare antes (mesma porta 4200): `docker compose stop front`.

### Doces de exemplo

Os 22 doces ficam em `src/app/data/seed-produtos.json` e são enviados via `POST /api/produto`,
pulando os que já existem pelo nome (pode rodar várias vezes sem duplicar):
Docker (automático), `npm run seed` ou, em modo dev, a página http://localhost:4200/seed (fora do menu).

### Fotos dos produtos

- Arquivo = nome do produto sem acento: "Pavê de Morango" → `public/doces/pave-de-morango.jpg` (`fotoProduto()`).
- Funciona em qualquer banco, independente do código gerado. Produto sem foto mostra `sem-foto.svg`.
- Créditos e licenças: `CREDITOS-IMAGENS.md`.

## 🗺️ Telas e rotas

| Rota | Tela | API |
|---|---|---|
| `/vitrine` | Vitrine (destaques) | `GET /produto/vitrine` |
| `/busca?q=termo` | Resultado da busca (sem `q` = todos) | `GET /produto/busca/{termo}` · `GET /produtos` |
| `/produto/:codigo` | Detalhe + comprar | `GET /produto/{codigo}` |
| `/cesta` | Cesta (fica no navegador) + finalizar | `POST /pedido` |
| `/cadastro` | Criar conta | `POST /cliente` |
| `/login` | Entrar | `POST /cliente/login` |
| `/esqueci-senha` | Senha temporária `Senha1234` | `PATCH /cliente/resetarSenha` |
| `/alterar-senha` | Criar nova senha | `PATCH /cliente/alterarSenha` |
| `/pedidos` · `/pedido/:codigo` | Meus pedidos / detalhe | `GET /pedido/{codigo}` |

## 🧱 Como o código está organizado

```
api/                     ← API do professor (não editar o Java)
docs/specs/              ← especificação e status de cada módulo · CLAUDE.md = regras e arquitetura
seed/seed.mjs            ← envia os doces de exemplo
src/app/
├── api/endpoints.ts     ← todas as URLs da API
├── models/              ← Produto, Cliente, Pedido, Cesta (regras da cesta)
├── composables/         ← useVitrine, useProduto, useCliente, useCesta, useSessao, usePedido…
└── components/          ← telas + topo, rodapé e card de produto
```

Os **composables** são funções `useX()` que fazem a chamada à API e devolvem *signals*
(`value()`, `isLoading()`, `error()`), então a tela atualiza sozinha — é o mesmo papel
do `ProdutoService` da aula, sem precisar de `subscribe` + `detectChanges()`.

## ✅ Testes

```bash
npx ng test --watch=false   # testes da Cesta, do useAcao e "should create" das telas
npx ng build                # build de produção
```
