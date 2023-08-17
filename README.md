# Stardrop App

Create and claim Stardrop with ease.

## Getting Started

First, create new `.env.local` with the following content:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
# openssl rand -base64 32
SIWE_SESSION_SECRET=

NFT_STORAGE_API_KEY=
DATABASE_URL=

CREATOR_ADDRESS=
CREATOR_SECRET=
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

## Database migrations

Run the following command to generate the migration:

```sh
pnpm db:gen
```

This command will read all files in `database/schema/*.ts` then generate the
migration.

You can generate custom migration by running the following command:

```sh
pnpm db:gen --custom
```

After the migrations file is generated, double check the generated migration
then you can run the following command to sync the database:

```sh
pnpm db:sync:dev
pnpm db:sync:prod
```

> [!NOTE] Make sure you have created `.env.dev` and `.env.prod` and define the
> `DATABASE_URL`
