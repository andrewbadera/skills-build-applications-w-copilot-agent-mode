import express from 'express';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

export const app = express();

app.use(express.json());

app.use('/api', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		res.sendStatus(204);
		return;
	}

	next();
});

export const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
	? `https://${codespaceName}-8000.app.github.dev`
	: `http://localhost:${PORT}`;

app.get('/api/health', (_req, res) => {
	res.json({ apiBaseUrl, status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error(error);
	res.status(500).json({ error: 'Internal server error' });
});
