# Store CMS

Store CMS is a multi-store commerce management dashboard built with Next.js. Store owners can manage their storefront catalog and settings, review orders and sales metrics, and take payments through Stripe checkout.

## Features

- Clerk powered sign-in, sign-up, and authenticated store dashboards
- Multi-store support with store-specific settings and catalog data
- CRUD management for billboards, categories, sizes, colors, and products
- Product image uploads using Cloudinary
- Order listing, dashboard sales metrics, and monthly revenue chart
- Stripe checkout sessions and webhook-based payment confirmation
- Responsive interface with light and dark themes

## Tech stack

Versions below are taken from `package.json`. A `^` indicates the declared compatible version range; `package-lock.json` records the resolved dependency tree.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-20232a?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%5E4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-%5E6.12.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Stripe-%5E18.4.0-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![ESLint](https://img.shields.io/badge/ESLint-%5E9-4B32C3?style=for-the-badge&logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-%5E3.6.2-F7B93E?style=for-the-badge&logo=prettier)](https://prettier.io/)

Other notable dependencies include React Hook Form (`^7.60.0`), Zod (`^4.0.5`), Zustand (`^5.0.6`), TanStack Table (`^8.21.3`), Recharts (`^3.1.2`), and Axios (`^1.10.0`).

## Getting started

### Prerequisites

- Node.js and npm
- PostgreSQL database
- Clerk application for authentication
- Stripe account and webhook endpoint for payments
- Cloudinary account for product images

### Install dependencies

```bash
npm install
```

The install script generates the Prisma client.

### Configure environment variables

Copy the example file to create your local environment file, then fill in the credentials for your services:

```bash
cp .env.example .env
```

The example includes the Clerk sign-in and sign-up configuration, Cloudinary cloud name, public site URL, Stripe settings, store URL, and Prisma database connection. Set `STORE_URL` to the storefront base URL used to build Stripe checkout success and cancellation URLs. Configure `NEXT_PUBLIC_SITE_URL` and `STRIPE_CLI_PATH` for your own local or deployment setup as needed.

Product uploads use the Cloudinary upload preset `cms-store`, configured in the upload widget. Make sure that preset exists in your Cloudinary account. Keep real credentials in `.env` and out of version control.

### Set up the database

Apply the Prisma schema to your PostgreSQL database and generate the client:

```bash
npx prisma db push
npx prisma generate
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `npm run dev`         | Start the Next.js development server with Turbopack          |
| `npm run build`       | Build the production application                             |
| `npm run start`       | Start the production server                                  |
| `npm run lint`        | Run the configured Next.js ESLint command                    |
| `npm run format`      | Format JavaScript, TypeScript, JSON, CSS, and Markdown files |
| `npm run studio`      | Open Prisma Studio                                           |
| `npx prisma generate` | Generate the Prisma client                                   |
| `npx prisma db push`  | Apply the Prisma schema to the configured database           |

## Project structure

```text
app/
├── (auth)/                 # Clerk sign-in and sign-up pages
├── (dashboard)/store/      # Store dashboard and management pages
├── (root)/                 # Store selection and onboarding routes
└── api/                    # Store, catalog, checkout, and webhook endpoints
actions/                    # Dashboard statistics actions
components/                 # Shared UI and dashboard components
hooks/                      # Client hooks and modal state
lib/                         # Prisma client, Stripe client, and utilities
models/                      # Shared TypeScript types
prisma/schema.prisma         # PostgreSQL data model
public/                      # Static assets
```

## API overview

Store-scoped API routes are available under `/api/[storeId]` for billboards, categories, sizes, colors, products, and checkout. Store creation and management routes live under `/api/stores`. The Stripe webhook endpoint is `/api/webhook` and handles completed checkout sessions, marks orders as paid, and archives purchased products.

## Deployment

Deploy as a Next.js application on a platform that supports the Next.js runtime. Configure the production PostgreSQL database, Clerk keys, Stripe API and webhook secrets, and Cloudinary settings in the hosting provider's environment variables. Then run the Prisma schema setup against the production database and build the application with:

```bash
npm run build
```
