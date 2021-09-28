# stable-demo

coding exercise for stable

## about

this project is a demo for [stable](https://www.usestable.com/).
it is a serverless deployment;
api endpoints run on [cloudflare workers](https://workers.cloudflare.com/),
and static resources are uploaded to [backblaze b2](https://www.backblaze.com/b2/cloud-storage.html).

## developer guide

- clone the repo
  ```sh
  $ git clone git@github.com:thekelvinliu/stable-code-exercise.git
  ```
- install dependencies
  ```sh
  $ yarn install --frozen-lockfile
  ```
- start development server
  ```sh
  $ yarn dev
  ```
- make production build
  ```sh
  $ yarn build
  ```
- upload contents of `bucket` to b2
  ```sh
  $ python3 -m venv .venv
  $ source .venv/bin/activate
  $ pip install b2
  $ b2 sync bucket/ b2://static-resource-bucket/
  ```
- update `wrangler.toml` with real account id and zone id values
- ship it!
  ```sh
  $ yarn deploy
  ```

## tech & tools

- [cloud-blaze](https://github.com/thekelvinliu/cloud-blaze):
  cloudflare workers handler for proxying requests to backblaze b2
- [fastify](https://github.com/fastify/fastify): fast server (for dev server)
- [vite](https://github.com/vitejs/vite): fast ui tool
- [yarn](https://github.com/yarnpkg/yarn): package management and script runner
