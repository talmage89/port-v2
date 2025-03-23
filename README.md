# PORT v2 - Modern Portfolio Website

A sleek, performance-optimized portfolio website built with Next.js 15, React 19, and TypeScript. This application showcases professional projects, skills, and provides a contact form for potential clients or employers.

![PORT v2 Screenshot](https://talmage.dev/img/port-v2.png)

## 🚀 Features

- **Modern Stack**: Built with Next.js 15 and React 19 for optimal performance
- **Server Components**: Leverages React Server Components for improved page loading speeds
- **Dynamic Projects Showcase**: Filterable portfolio of work with detailed project pages
- **Skills Section**: Visual representation of technical expertise and experience
- **Contact Form**: Secure form with rate limiting and CAPTCHA protection
- **Admin Dashboard**: Content management interface for easy updates
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe queries
- **Authentication**: Secure user authentication with NextAuth.js
- **Responsive Design**: Tailwind CSS for a fully responsive experience across all devices
- **SEO Optimized**: Built-in sitemap generation and robots.txt configuration
- **Markdown Support**: Content editing with MDX for rich formatting options
- **Telegram Integration**: Optional notifications for form submissions

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: App Router, Server Components, API Routes
- **React 19**: Latest React features with improved performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Accessible UI components as building blocks
- **Lucide Icons**: Beautiful, consistent icon set

### Backend

- **PostgreSQL**: Robust, open-source relational database
- **Drizzle ORM**: Type-safe database toolkit for TypeScript
- **Next-Auth**: Authentication solution for Next.js
- **Zod**: TypeScript-first schema validation
- **bcrypt**: Secure password hashing

### DevOps & Tools

- **Docker**: Postgres containerization for local development
- **GitHub Actions**: CI/CD workflows for testing and deployment
- **Prettier**: Code formatting for consistent style
- **Cloudflare**: CDN and security services

## 📋 Prerequisites

- Node.js 18.17 or later
- Docker and Docker Compose (for local PostgreSQL)
- npm or yarn

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/talmage89/port-v2.git
   cd port-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your values, see step below for telegram details
   ```

4. **Get Telegram Bot Token and Chat ID**

   - Go to [BotFather](https://t.me/botfather) and create a new bot
   - Paste bot token into .env
   - Send a message to the bot on telegram
   - Run `npm run telegram -- updates` in terminal and get the chat id from the response
   - Paste chat id into .env

5. **Start the database**

   ```bash
   docker-compose up -d
   ```

6. **Run database migrations**

   ```bash
   npm run migrate
   ```

7. **Seed database**

   ```bash
   npx tsx lib/scripts/import-skills.ts
   npx tsx lib/scripts/import-projects.ts
   npx tsx lib/scripts/import-case-studies.ts
   ```

8. **Create admin user** (optional)

   ```bash
   npm run create-user [username] [password]
   ```

9. **Start the development server**

   ```bash
   npm run dev
   ```

10. **Open [http://localhost:3000](http://localhost:3000)** to see your application

## 📊 Database Management

This project uses Drizzle ORM with PostgreSQL. The database schema is defined in the `db/schema` directory.

### Common Database Commands

- Generate migration files:

  ```bash
  npm run generate
  ```

- Apply migrations:

  ```bash
  npm run migrate
  ```

- Open Drizzle Studio (GUI for database):
  ```bash
  npm run studio
  ```

## 🧰 Project Structure

```
.
├── app/                # Next.js App Router files
│   ├── (main)/         # Main public-facing website routes
│   ├── admin/          # Admin dashboard routes
│   ├── api/            # API endpoints
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── db/                 # Database configurations
│   └── schema/         # Database schemas and types
├── drizzle/            # Drizzle migrations
├── lib/                # Shared utilities and helpers
│   ├── data/           # Data used in import scripts
│   └── scripts/        # CLI scripts
├── public/             # Static assets
└── middleware.ts       # Next.js middleware for auth, redirects, etc.
```
