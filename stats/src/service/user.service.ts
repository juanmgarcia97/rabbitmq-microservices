import { AttendanceService } from './attendance.service';
import axios from 'axios';

export class UserService {
  private userApi = process.env.USER_API;
  private attendanceService!: AttendanceService;

  constructor() {
    this.attendanceService = new AttendanceService();
  }

  async updateUserAttendance(id: string) {
    const attendances = await this.attendanceService.getAttendancesByUserId(id);
    const response = await axios.patch(`${this.userApi}/${id}`, {
      attendance: attendances.length,
    });
    return response.data.data;
  }
}
