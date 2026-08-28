import { createHash } from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const gamesRoot = join(root, 'assets', 'games');
const catalogRoot = join(root, 'catalog');
const manifestPath = join(catalogRoot, 'integrity-manifest.jsonl');
const write = process.argv.includes('--write');

async function walk(path) {
  const found = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) found.push(...await walk(child));
    else if (entry.isFile()) found.push(child);
  }
  return found;
}

async function sha256(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}

const paths = (await walk(gamesRoot)).sort((left, right) => left.localeCompare(right));
const records = [];
for (let index = 0; index < paths.length; index += 1) {
  const path = paths[index];
  const info = await stat(path);
  records.push({
    path: `assets/games/${relative(gamesRoot, path).replaceAll('\\', '/')}`,
    bytes: info.size,
    sha256: await sha256(path),
  });
  if ((index + 1) % 1000 === 0 || index + 1 === paths.length) console.log(`Verificação: ${index + 1}/${paths.length}`);
}

const inventory = JSON.parse(await readFile(join(catalogRoot, 'games.json'), 'utf8'));
const report = JSON.parse(await readFile(join(catalogRoot, 'archive-report.json'), 'utf8'));
const forbidden = records.filter(record => /subway[ _-]*surfers?|cdn-cgi\/challenge-platform|challenges\.cloudflare\.com/i.test(record.path));
if (inventory.length !== 73) throw new Error(`Inventário inválido: ${inventory.length}`);
if (report.complete + report.incomplete + report.failed !== 73) throw new Error('Totais do relatório são inconsistentes.');
if (forbidden.length) throw new Error(`Há ${forbidden.length} caminhos proibidos no arquivo.`);

for (const game of inventory) {
  if (/subway[ _-]*surfers?/i.test(`${game.name} ${game.slug} ${game.url}`)) throw new Error(`Item proibido no catálogo: ${game.slug}`);
  const detail = report.games.find(item => item.slug === game.slug);
  if (!detail) throw new Error(`Relatório ausente: ${game.slug}`);
  const entryPath = join(root, new URL(game.url).pathname.replace(/^\/+/, '').replaceAll('/', '\\'));
  if (detail.status !== 'failed' && (!existsSync(entryPath) || (await stat(entryPath)).size === 0)) {
    throw new Error(`Documento inicial ausente: ${game.slug}`);
  }
}

const serialized = `${records.map(record => JSON.stringify(record)).join('\n')}\n`;
if (write) {
  await writeFile(manifestPath, serialized, 'utf8');
} else {
  const expected = await readFile(manifestPath, 'utf8');
  if (expected !== serialized) throw new Error('O manifesto de integridade não corresponde aos arquivos atuais.');
}

console.log(JSON.stringify({
  games: inventory.length,
  files: records.length,
  bytes: records.reduce((sum, record) => sum + record.bytes, 0),
  complete: report.complete,
  incomplete: report.incomplete,
  failed: report.failed,
  manifestWritten: write,
}, null, 2));
