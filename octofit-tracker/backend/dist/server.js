"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.PORT = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
exports.app.get('/api/health', (_req, res) => {
    res.json({ apiBaseUrl: exports.apiBaseUrl, status: 'ok' });
});
exports.app.use('/api/users', users_1.usersRouter);
exports.app.use('/api/teams', teams_1.teamsRouter);
exports.app.use('/api/activities', activities_1.activitiesRouter);
exports.app.use('/api/leaderboard', leaderboard_1.leaderboardRouter);
exports.app.use('/api/workouts', workouts_1.workoutsRouter);
exports.app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
