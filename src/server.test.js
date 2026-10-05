const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('./server');

const contextPath = '/cpp-context-ai-assisted-business-analyst';

test('health endpoint returns UP', async () => {
  const response = await app.inject({
    method: 'GET',
    url: `${contextPath}/health`,
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), {
    status: 'UP',
    service: 'cpp-context-ai-assisted-business-analyst',
  });
});

test('root page is served', async () => {
  const response = await app.inject({
    method: 'GET',
    url: `${contextPath}/`,
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /Fastify service is running/);
});

test.after(async () => {
  await app.close();
});
