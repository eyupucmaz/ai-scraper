import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema';

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// For query client
export const db = drizzle(pool, { schema });

// For migrations
export const runMigrations = async () => {
  if (process.env.NODE_ENV === 'production') return;

  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed');
  } catch (error) {
    console.error('Error during migrations:', error);
    throw error;
  }
};

export { schema };