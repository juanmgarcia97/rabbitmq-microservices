export class AttendanceNotFound extends Error {
  constructor() {
    super('Attendance not found');
    this.name = 'AttendanceNotFound';
  }
}
