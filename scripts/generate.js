/**
 * generate static html required for a full vite build
 */

import { writeFile } from 'fs/promises';
import { resolve } from 'path';

import { format } from 'prettier';

// eslint-disable-next-line
import { render } from '../dist/server-html';

const main = async function main() {
  // call render function exported by src/server-html.jsx
  const html = render({
    author: 'kelvin liu',
    description: 'stable code exercise',
    title: 'mail dashboard demo'
  });

  // write index.html to project root so vite can find it
  const outFile = resolve(__dirname, '../index.html');
  await writeFile(outFile, format(html, { parser: 'html' }), 'utf-8');
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
