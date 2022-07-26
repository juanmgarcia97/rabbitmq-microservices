import { Attendance, AttendanceService } from './attendance.service';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class AttendanceServiceImpl implements AttendanceService {
  private attendanceApi = process.env.ATTENDANCE_API;

  async findAllByUser(userId: string): Promise<Attendance[]> {
    const response = await axios.get(`${this.attendanceApi}/user/${userId}`);
    return response.data.data as Attendance[];
  }

  async deleteAttendancesForUser(userId: string): Promise<void> {
    await axios.delete(`${this.attendanceApi}/user/${userId}`);
  }
}
