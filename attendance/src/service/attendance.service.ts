import { Attendance } from '../domain/attendance';

export interface AttendanceService {
  createAttendance(attendance: Attendance): Promise<Attendance>;
  findAllByUser(userId: string): Promise<Attendance[]>;
  findAttendanceById(id: string): Promise<Attendance>;
  deleteAttendancesForUser(userId: string): Promise<void>;
  deleteAttendanceById(id: string): Promise<void>;
}
