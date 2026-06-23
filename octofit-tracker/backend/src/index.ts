import { connectDatabase } from './config/database';
import { apiBaseUrl, app, PORT } from './server';

async function start() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Backend listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void start();
