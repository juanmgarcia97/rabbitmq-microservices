import { ObjectID } from 'typeorm';
export type Attendance = {
    _id: ObjectID,
    userid: string,
    startTime: string,
    endTime: string,
    date: Date,
    notes: string
}

export interface AttendanceService {
    findAllByUser(userId: string): Promise<Attendance[]>;
    deleteAttendancesForUser(userId: string): Promise<void>;
    // findAttendanceById(id: string): Promise<Attendance>;
}