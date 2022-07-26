import axios from 'axios';
export class AttendanceService {
  private attendanceApi = process.env.ATTENDANCE_API;

  async getAttendancesByUserId(id: string) {
    const response = await axios.get(`${this.attendanceApi}/user/${id}`);
    return response.data.data;
  }
}
