const endpoint = process.argv[2] || 'http://127.0.0.1:9334';
const site = process.argv[3] || 'http://localhost:5199/';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let target;
for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
  try {
    const response = await fetch(`${endpoint}/json`);
    if (response.ok) target = (await response.json()).find((item) => item.type === 'page');
  } catch {}
  if (!target) await sleep(250);
}

if (!target) throw new Error('Nenhuma página CDP disponível para preparar a auditoria.');

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});

let sequence = 0;
const pending = new Map();
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  pending.get(message.id)(message);
  pending.delete(message.id);
};
const send = (method, params = {}) => new Promise((resolve) => {
  const id = ++sequence;
  pending.set(id, resolve);
  socket.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', { media: '', features: [] });
await send('Page.navigate', { url: site });
await sleep(2500);
const record = JSON.stringify({
  version: 1,
  necessary: true,
  analytics: false,
  marketing: false,
  ts: new Date().toISOString(),
});
await send('Runtime.evaluate', {
  expression: `localStorage.setItem('hp_cookie_consent', ${JSON.stringify(record)})`,
});
await send('Page.navigate', { url: 'about:blank' });
await sleep(300);
socket.close();
console.log('Consentimento necessário preparado para a auditoria.');
