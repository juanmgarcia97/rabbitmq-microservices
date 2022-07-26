import 'reflect-metadata';
import 'dotenv/config';
import express, { json } from 'express';
import { errorHandler } from './infrastructure/middleware/error.handler';
import { AppDataSource } from './infrastructure/persistence/db.config';
import AttendanceController from './controllers/attendance.controller';

const app = express();
const port = 3_001;

app.use(json());
app.use('/attendances', AttendanceController);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
});
