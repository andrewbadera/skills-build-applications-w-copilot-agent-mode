"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${PORT}.app.github.dev`
    : `http://localhost:${PORT}`;
app.get('/api/health', (_req, res) => {
    res.json({ apiBaseUrl, status: 'ok' });
});
app.use('/api/users', users_1.usersRouter);
app.use('/api/teams', teams_1.teamsRouter);
app.use('/api/activities', activities_1.activitiesRouter);
app.use('/api/leaderboard', leaderboard_1.leaderboardRouter);
app.use('/api/workouts', workouts_1.workoutsRouter);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend listening on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void start();
