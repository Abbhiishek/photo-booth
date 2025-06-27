import {
    pgTable,
    text,
    serial,
} from 'drizzle-orm/pg-core';

export const category = pgTable('category', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
});
