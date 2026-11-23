// Envia os doces de exemplo para a API (POST /api/produto), pulando os que já existem pelo nome.
// Docker:  serviço "seed" do docker-compose (roda sozinho ao subir).
// Sem Docker:  npm run seed   (API em http://localhost:8081)
import { readFile } from 'node:fs/promises';

const API = process.env.API_URL ?? 'http://localhost:8081/api';
const produtos = JSON.parse(await readFile(new URL('../src/app/data/seed-produtos.json', import.meta.url), 'utf8'));
const esperar = ms => new Promise(r => setTimeout(r, ms));

// A API demora ~45s para subir: tenta por até 3 minutos.
async function listarProdutos() {
  for (let tentativa = 1; tentativa <= 60; tentativa++) {
    try {
      const res = await fetch(`${API}/produtos`);
      if (res.ok) return await res.json();
    } catch { /* API ainda subindo */ }
    console.log(`Aguardando a API (${tentativa}/60)...`);
    await esperar(3000);
  }
  throw new Error(`API não respondeu em ${API}`);
}

const existentes = new Set((await listarProdutos()).map(p => p.nome.trim().toLowerCase()));
let criados = 0;

// Um por vez, para os códigos saírem na ordem do JSON.
for (const p of produtos) {
  if (existentes.has(p.nome.toLowerCase())) continue;
  const res = await fetch(`${API}/produto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...p, codigo: 0 }),
  });
  if (!res.ok) throw new Error(`Falha ao cadastrar "${p.nome}": HTTP ${res.status}`);
  console.log(await res.text(), '-', p.nome);
  criados++;
}

console.log(`Seed concluído: ${criados} cadastrado(s), ${produtos.length - criados} já existia(m).`);
