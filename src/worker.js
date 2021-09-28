/**
 * cloudflare worker script
 */

/* eslint-env worker */

import b2ProxyHandler from 'cloud-blaze';

// from https://github.com/useStable/code-exercise/blob/ec3464b4421647b3b7893d666e4f4a7899af03da/data.json
import DATA from './data.json';

const MOCK_DATA = JSON.stringify(DATA);
const MOCK_HEADERS = {
  'content-length': MOCK_DATA.length,
  'content-type': 'application/json'
};

/**
 * api/app handler for stable code exercise
 *
 * requests to:
 *
 * - `/api/mail` are served the provided mock data.json
 * - `/app` are proxied to a b2 bucket, which contains static files for react front end
 * - `/info` are served some basic build info
 * - `*` are redirected to `/app`
 *
 * @param {object} event - cloudflare worker fetch event
 * @returns {Response} http response
 */
const handler = event => {
  const url = new URL(event.request.url);

  const mockAPIEndpoint = '/api/mail';
  if (url.pathname === mockAPIEndpoint) {
    return new Response(MOCK_DATA, { headers: MOCK_HEADERS });
  }

  const publicPrefix = '/app';
  if (url.pathname.startsWith(publicPrefix)) {
    return b2ProxyHandler({ event, publicPrefix });
  }

  return Response.redirect(`${url.origin}/app`, 301);
};

// cloudflare worker boilerplate
// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', event => {
  event.respondWith(handler(event));
});
