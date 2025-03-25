import { pgTable, serial, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './auth.schema';

export { users, accounts, sessions, verificationTokens };

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  apiKey: text('api_key').notNull().unique(),
  geminiApiKey: text('gemini_api_key').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Usage logs
export const usageLogs = pgTable('usage_logs', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  success: boolean('success').notNull(),
  responseTime: serial('response_time'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  usageLogs: many(usageLogs),
}));

export const usageLogsRelations = relations(usageLogs, ({ one }) => ({
  project: one(projects, {
    fields: [usageLogs.projectId],
    references: [projects.id],
  }),
}));