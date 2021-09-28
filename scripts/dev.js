/**
 * dev server powered by vite
 *
 * based on:
 * https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
 */

import fastify from 'fastify';
import middie from 'middie';
import { createServer as createViteServer } from 'vite';

// from https://github.com/useStable/code-exercise/blob/ec3464b4421647b3b7893d666e4f4a7899af03da/data.json
import data from '../src/data.json';

const start = async function createAndStartDevServer() {
  const app = fastify();

  // mock data api endpoint
  app.get('/api/mail', () => data);

  // enable express-style middlewares
  await app.register(middie);

  // use vite ssr middleware
  const vite = await createViteServer({
    logLevel: 'info',
    root: process.cwd(),
    server: { middlewareMode: 'ssr' }
  });
  app.use(vite.middlewares);

  // catch-all for ssr
  app.get('*', async function handleSSR(request, reply) {
    try {
      // get initial html (read or ssr)
      const { render } = await vite.ssrLoadModule('/src/server-html.jsx');
      let html = render({ title: 'dev demo' });

      // add scripts for hmr and vite
      html = await vite.transformIndexHtml(request.url, html);

      reply.type('text/html').send(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      reply.status(500).send(err.toString());
    }
  });

  const addr = await app.listen(process.env.SERVER_PORT || 3000);
  console.log(`listening on '${addr}'`);

  return app;
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});
