# Art Market Print App

Production web app for an art-market e-commerce/catalog experience, built with Next.js App Router and integrated with Sanity CMS.

## Tech Stack

- [Next.js 16.2.4](https://nextjs.org/)
- [React 19.2.5](https://react.dev/) and [React DOM 19.2.5](https://react.dev/)
- [HeroUI 3.0.2](https://www.heroui.com/) (`@heroui/react`, `@heroui/styles`)
- [Tailwind CSS 4.2.2](https://tailwindcss.com/)
- [TypeScript 6.0.2](https://www.typescriptlang.org/)
- [Sanity](https://www.sanity.io/) via `next-sanity`
- [Algolia](https://www.algolia.com/) (`algoliasearch`, `react-instantsearch`)
- [Framer Motion 12.38.0](https://www.framer.com/motion/)
- [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_TOKEN=
```

### 3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start development server with Turbopack
- `npm run dev:webpack` - start development server with Webpack
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run ESLint with auto-fix
- `npm run update-products` - run product update script
- `npm run backup-sanity` - back up Sanity dataset
- `npm run sync-services-algolia` - sync services index to Algolia
- `npm run sync-products-algolia` - sync products index to Algolia

## License

Licensed under the [MIT license](./LICENSE).
