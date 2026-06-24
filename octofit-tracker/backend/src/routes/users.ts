import { Router } from 'express';
import { User } from '../models/User';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 }).lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});