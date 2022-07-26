import express, { NextFunction, Request, Response } from 'express';
import container from '../../inversify.config';
import { InvalidAttendance } from '../domain/exceptions/invalidAttendance';
import { AttendanceService } from '../service/attendance.service';

const router = express.Router();

const attendanceService: AttendanceService =
  container.get<AttendanceService>('AttendanceService');

router.get(
  '/user/:userId',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request.params;
      const users = await attendanceService.findAllByUser(userId);
      response.status(200).json({
        message: 'Attendances found',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const attendance = request.body;
      if (attendance === {}) throw new InvalidAttendance(attendance);
      const newAttendance = await attendanceService.createAttendance(
        attendance
      );
      response.status(201).json({
        message: 'Attendance created',
        data: newAttendance,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/user/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      await attendanceService.deleteAttendancesForUser(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      await attendanceService.deleteAttendanceById(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.all('*', () => {
  throw new Error('Page not found');
});

export default router;
