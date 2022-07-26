import { DataSource } from 'typeorm';
import { AttendanceEntity } from './entities/attendance.entity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  // url: 'mongodb://localhost:27017/attendance-api',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  useUnifiedTopology: true,
  entities: [AttendanceEntity],
});
