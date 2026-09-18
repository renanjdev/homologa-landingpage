#!/usr/bin/env node
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const accountsRoot = join(process.env.APPDATA || '', 'orca', 'codex-accounts');
const account = existsSync(accountsRoot)
  ? readdirSync(accountsRoot).find((name) => existsSync(join(accountsRoot, name, 'home', 'skills', 'fable-design', 'portao', 'check.mjs')))
  : null;

if (!account) {
  console.error('fable-design não encontrado no catálogo local de skills.');
  process.exit(1);
}

const checker = join(accountsRoot, account, 'home', 'skills', 'fable-design', 'portao', 'check.mjs');
const result = spawnSync(process.execPath, [checker, ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(result.status ?? 1);
