import { Router } from 'express';
import { Activity } from '../models/Activity';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).lean();
    res.json({ activities });
  } catch (error) {
    next(error);
  }
});