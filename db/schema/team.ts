import {
    pgTable,
    text,
    timestamp,
    serial,
} from 'drizzle-orm/pg-core';

export const team = pgTable('team', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
});
