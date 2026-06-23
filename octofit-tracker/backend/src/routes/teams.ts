import { Router } from 'express';
import { Team } from '../models/Team';

export const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).lean();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});