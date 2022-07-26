import { Attendance } from '../attendance';
export class InvalidAttendance extends Error {
  constructor(attendance: Attendance) {
    super("Can't create an empty attendance");
    this.name = 'InvalidAttendance';
    this.stack = JSON.stringify(attendance);
  }
}
