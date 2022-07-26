import { Attendance } from '../domain/attendance';
export type User = {
    id: string,
    nickname: string,
    fullName: string,
    age: number,
    attendance: number,
    attendances: Attendance[]
}

export interface UserService {
    findUserById(id: string): Promise<User>;
}