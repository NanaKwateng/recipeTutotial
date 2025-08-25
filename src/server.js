import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js';
import { and, eq } from 'drizzle-orm';

import job from './config/cron.js';
import { env } from './config/env.js';

//Starting the cron job
if (env.NODE_ENV === 'production') job.start();
const app = express();
const PORT = process.env.PORT || 8001
app.use(express.json());

//Getting a health check endpoint
app.get('/api/health', (req, res) => {
  res.send('Healthy');
  res.status(200).json({ success: true });
});

//parsing the incoming requests with JSON payloads
app.post("/api/favorites", async (req, res) => {
  try {
    const { user_id, recipe_id, title, image, cook_time, servings } = req.body;
    if (!userId || !recipeId || !title ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newFavorites = await db.insert(favoritesTable).values({
    userId,
    recipeId,
    title,
    image,
    cookTime,
    servings,
  }) .returning();

    res.status(201).json(newFavorites[0]);
  } catch (error) {
    console.log("error adding new Favorites:", error);
    console.error(error);
    res.status(500).json({ error: 'Internal server error, something went wrong' });
  }
});

//Delete a favorite recipe by ID
app.delete('/api/favorites/:userId/:recipeId', async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const deletedFavorites = await db.delete(favoritesTable).where(and(
      favoritesTable.userId.eq(userId), eq(favoritesTable.recipeId, parseIntrecipeId))).returning();
    res.status(200).json({ message: 'Favorite removed successfully', deletedFavorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing favorite', message: 'Internal server error' });
  }
});

//Get all favorite recipes for a user
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId));
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting favorites', message: 'Internal server error' });
  }
});

//Listening on the specified port
app.listen(5001, () => {
  console.log('Server is running on port:', PORT);
});