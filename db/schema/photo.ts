import {
    pgTable,
    text,
    timestamp,
    index,
    serial,
    jsonb,
    boolean,
    integer,
} from 'drizzle-orm/pg-core';
import { team } from './team';
import { category } from './options';


export const photoBoothStatus = text('status').$type<'pending' | 'approved' | 'rejected'>();


export const photo = pgTable('photo_booth', {
    id: serial('id').primaryKey(),

    // Link to file storage (URL or path or S3 key)
    photoUrl: text('photo_url').notNull(),

    // Status of the photo: pending, approved, rejected
    status: photoBoothStatus.default('pending').notNull(),
    teamId: integer('team_id').references(() => team.id),
    tags: text('tags').array(),
    categoryId: integer('category_id').references(() => category.id),
    caption: text('caption'),
    isFeatured: boolean('is_featured').default(false),
    metadata: jsonb('metadata').default({}).$type<{
        width: number;
        height: number;
    }>(),
});
