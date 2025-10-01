import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { notes } from './note.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));
