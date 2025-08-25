import { integer } from 'drizzle-orm/gel-core';
import {pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core';

export const favoritesTable = pgTable('favorites', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    recipeId: integer('recipe_id').notNull(),
    title: text('title').notNull(),
    image: text('image'),
    cookTime: text('cook_time'),
    servings: text('servings'),
    createdAt: timestamp('created_at').defaultNow(),
    // updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// export const usersTable = pgTable('users', {
//     id: serial('id').primaryKey(),
//     // Assuming userId is a unique identifier, we can use text or uuid type
//     name: text('name').notNull(),
//     email: text('email').notNull(),
//     password: text('password').notNull(),
//     createdAt: timestamp('created_at').notNull().defaultNow(),
//     updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });