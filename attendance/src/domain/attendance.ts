export class Attendance {
  constructor(
    private attendanceId: string,
    private userId: string,
    private attendanceStartTime: string,
    private attendanceEndTime: string,
    private attendanceDate: Date,
    private attendanceNotes: string
  ) { }

  get _id() {
    return this.attendanceId;
  }

  set _id(value: string) {
    this.attendanceId = value;
  }

  get userid() {
    return this.userId;
  }

  set userid(value: string) {
    this.userId = value;
  }

  get startTime(): string {
    return this.attendanceStartTime;
  }

  set startTime(value: string) {
    this.attendanceStartTime = value;
  }

  get endTime(): string {
    return this.attendanceEndTime;
  }

  set endTime(value: string) {
    this.attendanceEndTime = value;
  }

  get date(): Date {
    return this.attendanceDate;
  }

  set date(value: Date) {
    this.attendanceDate = value;
  }

  get notes(): string {
    return this.attendanceNotes;
  }

  set notes(value: string) {
    this.attendanceNotes = value;
  }
}
