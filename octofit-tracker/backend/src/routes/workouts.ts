import { Router } from 'express';
import { Workout } from '../models/Workout';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ focus: 1, name: 1 }).lean();
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});