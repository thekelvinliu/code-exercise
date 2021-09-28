import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './components/App';

// for noto sans and pt sans
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css?family=Noto+Sans:400,700|PT+Sans:700';

/**
 * render static html app shell
 *
 * @param {object} params - component props
 * @param {string} params.author - html meta tag author content
 * @param {string} params.description - html meta tag description content
 * @param {string} params.title - html title
 * @returns {string} static html app shell
 */
export const render = function renderHTML({ author, description, title } = {}) {
  const html = renderToStaticMarkup(
    <React.StrictMode>
      <html lang="en-US">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* meta and title info */}
          {author ? <meta name="author" content={author} /> : null}
          {description ? <meta name="description" content={description} /> : null}
          <title>{title}</title>
          {/* favicon and styles */}
          <link rel="icon" href="/src/favicon.ico" />
          <link rel="stylesheet" href="/src/global.scss" />
          {/* noto sans via google fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="preload" as="style" href={GOOGLE_FONTS_URL} />
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </head>
        <body className="min-vh-100 min-vw-100">
          <main className="d-flex flex-column min-vh-100 w-100" id="app">
            <App />
          </main>
          <script src="/src/client.jsx" type="module" />
        </body>
      </html>
    </React.StrictMode>
  );
  return ['<!DOCTYPE html>', html].join('\n');
};
