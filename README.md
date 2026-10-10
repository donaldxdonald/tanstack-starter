# TanStack Start Starter

A batteries-included full-stack React starter built with TanStack Start and Vite+.

## What's Included

### Application

- [React 19](https://react.dev/) with the [React Compiler](https://react.dev/learn/react-compiler)
- [TanStack Start](https://tanstack.com/start) for full-stack React and server-side rendering
- [TanStack Router](https://tanstack.com/router) with type-safe, file-based routing
- [TanStack Query](https://tanstack.com/query) with SSR integration
- [Tailwind CSS v4](https://tailwindcss.com/) and the Typography plugin
- [Lucide React](https://lucide.dev/) icons
- [Fumadocs](https://www.fumadocs.dev/) with MDX content and preset `/privacy` and `/terms` pages
- TanStack Router and Query devtools

### Tooling

- [Vite+](https://viteplus.dev/) for package management, development, builds, formatting, linting, type checking, and tests
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) with Testing Library and jsdom
- Oxlint and Oxfmt through Vite+
- ESLint with Antfu's React configuration as an optional additional lint pass
- A pre-commit hook that runs `vp staged`
- `#/*` as an import alias for `src/*`

### Deployment

- [Nitro](https://nitro.build/) server output
- Cloudflare Workers preset and Wrangler commands included by default
- A setup script for restoring or configuring the Cloudflare deployment files

## Getting Started

Vite+ manages the project's pinned pnpm runtime and frontend toolchain.

```bash
vp install
vp dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

Start editing the home route at `src/routes/index.tsx`.

## Commands

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `vp install`             | Install dependencies                      |
| `vp dev`                 | Start the development server on port 3000 |
| `vp build`               | Create a production build                 |
| `vp preview`             | Preview the production build locally      |
| `vp test`                | Run the Vitest test suite                 |
| `vp check`               | Format, lint, and type-check the project  |
| `vp run generate-routes` | Regenerate the TanStack Router route tree |
| `vp run lint:eslint`     | Run the additional ESLint configuration   |
| `vp run lint:eslint:fix` | Run ESLint and apply fixes                |

## Project Structure

```text
content/
└── legal/                # Privacy and terms MDX content

src/
├── components/
│   └── legal-page.tsx    # Shared Fumadocs page renderer
├── integrations/
│   └── tanstack-query/   # Query client and devtools integration
├── lib/
│   └── legal.ts          # Fumadocs content source
├── routes/
│   ├── __root.tsx        # Root document, metadata, and devtools
│   ├── _legal.tsx        # Pathless Fumadocs layout
│   ├── _legal.privacy.tsx # /privacy
│   ├── _legal.terms.tsx   # /terms
│   └── index.tsx         # Home route
├── router.tsx            # Router and Query SSR integration
├── routeTree.gen.ts      # Generated route tree
└── styles.css             # Global Tailwind styles

scripts/
└── setup-cloudflare-workers.mjs

nitro.config.ts            # Nitro deployment preset
vite.config.ts             # Vite+, React, Start, Nitro, and Tailwind config
vitest.config.ts           # Unit tests with the Fumadocs MDX plugin
```

## Routing

Routes are files inside `src/routes`. Add a file to create a route; TanStack Router generates the corresponding type-safe route tree.

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <h1>About</h1>
}
```

Use `Link` for client-side navigation:

```tsx
import { Link } from '@tanstack/react-router'
;<Link to="/about">About</Link>
```

The shared HTML document and app shell live in `src/routes/__root.tsx`.

## Legal Pages

The `/privacy` and `/terms` routes share a Fumadocs layout. Each starts with one placeholder paragraph, not a finished legal document.

Edit `content/legal/privacy.mdx` and `content/legal/terms.mdx` to replace the placeholders. The frontmatter `title` appears in the page heading and sidebar. Browser titles are configured in the corresponding route files.

Fumadocs MDX uses its Vite plugin and Macro API, so no content-generation command is needed. Search is disabled because these pages do not configure a search endpoint.

## Data Fetching

The starter creates a TanStack Query client for each router instance and connects it to TanStack Router's SSR integration. Route loaders, server functions, and Query can therefore be used together for server and client data loading.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  loader: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  },
  component: Posts,
})

function Posts() {
  const posts = Route.useLoaderData()
  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}
```

## Server Functions

TanStack Start server functions keep server-only logic callable from React code:

```tsx
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn({ method: 'GET' }).handler(async () =>
  new Date().toISOString(),
)
```

## Deploying to Cloudflare Workers

The repository is configured with Nitro's `cloudflare_module` preset and includes Wrangler commands.

Authenticate once, then preview or deploy:

```bash
vp exec wrangler login
vp run cf:preview
vp run cf:deploy
```

To recreate the Cloudflare configuration and commands in a starter that does not have them, run:

```bash
vp run setup:cloudflare
```

For other deployment targets, change the preset in `nitro.config.ts` and follow the [Nitro deployment guide](https://nitro.build/deploy).

## Learn More

- [TanStack Start documentation](https://tanstack.com/start)
- [TanStack Router documentation](https://tanstack.com/router)
- [TanStack Query documentation](https://tanstack.com/query)
- [Vite+ documentation](https://viteplus.dev/guide/)
- [Nitro documentation](https://nitro.build/)
