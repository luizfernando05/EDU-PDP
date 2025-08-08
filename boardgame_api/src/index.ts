import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/database/mongo';
import disciplineRoutes from './modules/discipline/routes/discipline.routes';
import cardRoutes from './modules/card/routes/card.route';
import cors from 'cors';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));

app.get('/', (req, res) => {
  res.send('Boardgame API says hello!');
});

async function startServer() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });

  app.use(disciplineRoutes);
  app.use(cardRoutes);
}

startServer();
