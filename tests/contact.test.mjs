import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, resolveContactEndpoint, sendContact } from '../src/lib/contact.js';

test('rechaza campos vacíos y correo inválido; acepta nombre internacional', () => {
  const empty = validateContact({ firstName: '  ', lastName: '', email: 'a@' });
  assert.ok(Object.values(empty).every(Boolean));
  const valid = validateContact({ firstName: ' María ', lastName: 'O’Connor', email: 'persona@example.test' });
  assert.ok(Object.values(valid).every(value => value === ''));
});
test('sin configuración o con destino externo nunca habilita el envío', () => {
  const origin = 'https://muhu.example';
  assert.equal(resolveContactEndpoint('', origin), null);
  assert.equal(resolveContactEndpoint('https://external.example/contact', origin), null);
  assert.equal(resolveContactEndpoint('//external.example/contact', origin), null);
  assert.equal(resolveContactEndpoint('mailto:test@example.test', origin), null);
  assert.equal(resolveContactEndpoint('/api/contact', origin), origin + '/api/contact');
});
test('solo confirma respuestas HTTP exitosas con JSON ok:true', async t => {
  for (const response of [new Response('<html>SPA fallback</html>'), Response.json({}), Response.json({ ok: false }), Response.json({ ok: true }, { status: 500 })]) {
    t.mock.method(globalThis, 'fetch', async () => response);
    await assert.rejects(sendContact('/api/contact', {}, 'test-id'), /unconfirmed/);
    t.mock.restoreAll();
  }
  t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: true }));
  await assert.doesNotReject(sendContact('/api/contact', {}, 'test-id'));
});
test('envía JSON, idempotencia y señal de cancelación; rechaza redirecciones', async t => {
  const controller = new AbortController();
  const payload = { firstName: 'Prueba', lastName: 'Local', email: 'test@example.test' };
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, '/api/contact');
    assert.equal(options.method, 'POST');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers['Idempotency-Key'], 'same-request');
    assert.equal(options.signal, controller.signal);
    assert.deepEqual(JSON.parse(options.body), payload);
    return Response.json({ ok: true });
  });
  await sendContact('/api/contact', payload, 'same-request', controller.signal);
});
test('propaga fallo de red para conservar formulario y permitir reintento', async t => {
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline'); });
  await assert.rejects(sendContact('/api/contact', {}, 'test-id'), /offline/);
});
