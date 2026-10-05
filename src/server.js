const fastify = require('fastify')({ logger: true });

const serviceName = 'cpp-context-ai-assisted-business-analyst';
const contextPath = process.env.CONTEXT_PATH || `/${serviceName}`;
const port = Number(process.env.PORT || 4550);

fastify.get(`${contextPath}/health`, async () => ({
  status: 'UP',
  service: serviceName,
}));

fastify.get(`${contextPath}/`, async (_request, reply) => {
  reply.type('text/html');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AI Assisted Business Analyst</title>
</head>
<body>
  <h1>AI Assisted Business Analyst</h1>
  <p>Fastify service is running.</p>
  <p><a href="${contextPath}/health">Health</a></p>
</body>
</html>`;
});

async function start() {
  await fastify.listen({ port, host: '0.0.0.0' });
}

if (require.main === module) {
  start().catch((error) => {
    fastify.log.error(error);
    process.exit(1);
  });
}

module.exports = fastify;
