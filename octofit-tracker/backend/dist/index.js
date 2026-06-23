"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const server_1 = require("./server");
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to MongoDB');
        server_1.app.listen(server_1.PORT, () => {
            console.log(`Backend listening on ${server_1.apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void start();
