import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/database/mongo';
import disciplineRoutes from './modules/discipline/routes/discipline.routes';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Boardgame API says hello!');
});

async function startServer() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });

  app.use(disciplineRoutes);
}

startServer();
