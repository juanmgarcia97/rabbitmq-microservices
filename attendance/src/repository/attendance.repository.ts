import { Attendance } from '../domain/attendance';

export interface AttendanceRepository {
  createAttendance(attendance: Attendance): Promise<Attendance>;
  findAllByUser(userId: string): Promise<Attendance[]>;
  findAttendanceById(id: string): Promise<Attendance>;
  deleteAttendancesForUser(userId: string): Promise<void>;
  deleteAttendance(attendance: Attendance): Promise<void>;
}
