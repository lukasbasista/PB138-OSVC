import path from 'path';
import dotenv from 'dotenv';
import App from './app';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = Number(process.env.SERVER_PORT) || 3000;

const app = new App(PORT);

app.listen();

export default app;
