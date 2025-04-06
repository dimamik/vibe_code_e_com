# Vibe Code E-Commerce Shop

A modern e-commerce shop built with Next.js, featuring t-shirt sales with color and size selection, authentication, and an admin panel.

## Features

- User authentication (sign up, sign in)
- Product listing with images
- Product detail pages with color and size selection
- Admin panel for product management
- Modern UI with Tailwind CSS
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js 18 or later
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd vibe_code_e_com
```

2. Install dependencies:

```bash
npm install
```

3. Set up your PostgreSQL database and update the `.env` file with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/vibe_code_shop"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Creating an Admin User

To create an admin user, you can use the Prisma Studio:

1. Run Prisma Studio:

```bash
npx prisma studio
```

2. Navigate to the User table
3. Create a new user with `isAdmin` set to `true`

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js

## License

MIT
