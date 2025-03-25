# AI Scraper API

A modern AI-powered web scraping service that transforms web content into structured JSON data using AI. This project leverages Next.js, Drizzle ORM, PostgreSQL, and Gemini AI to provide a seamless data extraction experience.

## Project Overview

AI Scraper API is designed for developers and data analysts who need to extract structured data from websites but lack the expertise or time to write their own web scrapers. The service simplifies the data extraction process by leveraging AI to transform web content into structured JSON data according to user-specified formats.

## Features

- **AI-Powered Extraction**: Transform any web content into structured JSON using Gemini AI
- **User Authentication**: Secure login via GitHub and Google OAuth
- **Project Management**: Create and manage multiple scraping projects
- **API Access**: Generate API keys for programmatic access
- **Dashboard**: Monitor usage statistics and manage projects
- **Responsive UI**: Modern interface built with Shadcn UI components

## Tech Stack

- **Frontend**: Next.js 15, React 19, Shadcn UI, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Containerization**: Docker and Docker Compose
- **AI Integration**: Gemini AI API

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Docker and Docker Compose (for local development with PostgreSQL)
- Gemini API key

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required values
3. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Database Setup

Run the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

Apply database migrations:

```bash
npm run db:migrate
# or
pnpm db:migrate
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Documentation

### Authentication

To access the API, you need to authenticate using your API key:

```
Authorization: Bearer YOUR_API_KEY
```

### Scraping Endpoint

```
POST /api/scrape
```

Request body:

```json
{
  "url": "https://example.com",
  "output_format": {
    "type": "json_example | json_schema",
    "format": {...}  // Example JSON or JSON Schema
  }
}
```

## Deployment

The application can be deployed using Docker:

```bash
docker-compose -f docker-compose.yml up -d
```

For production deployment, follow the detailed instructions in the deployment documentation.

## License

[MIT](https://choosealicense.com/licenses/mit/)
