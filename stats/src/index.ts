import 'dotenv/config';
import express from 'express';
import { StatsService } from './service/stats.service';

const app = express();
const port = 3_002;

const service = new StatsService();

app
  .listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  })
  .on('close', () => {
    service.closeConnection();
  });
