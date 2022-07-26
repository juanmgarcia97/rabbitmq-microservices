import { inject, injectable } from 'inversify';
import { Attendance } from '../domain/attendance';
import { AttendanceRepository } from '../repository/attendance.repository';
import { AttendanceService } from './attendance.service';
import { UserService } from './user.service';
import { AxiosError } from 'axios';
import { UserNotFound } from '../domain/exceptions/userNotFound';
import { SenderService } from '../rabbitmq/sender.service';

@injectable()
export class AttendanceServiceImpl implements AttendanceService {
  @inject('AttendanceRepository') attendanceRepository!: AttendanceRepository;
  @inject('UserService') userService!: UserService;

  constructor(@inject('SenderService') private rabbit: SenderService) {}

  async createAttendance(attendance: Attendance): Promise<Attendance> {
    try {
      await this.userService.findUserById(attendance.userid);
    } catch (error) {
      if (error instanceof AxiosError) throw new UserNotFound();
    }
    const promise = await this.attendanceRepository.createAttendance(
      attendance
    );
    this.rabbit.publishMessage(promise.userid);
    return promise;
  }

  async findAllByUser(userId: string): Promise<Attendance[]> {
    return this.attendanceRepository.findAllByUser(userId);
  }

  async findAttendanceById(id: string): Promise<Attendance> {
    return this.attendanceRepository.findAttendanceById(id);
  }

  async deleteAttendancesForUser(id: string): Promise<void> {
    await this.attendanceRepository.deleteAttendancesForUser(id);
  }

  async deleteAttendanceById(id: string): Promise<void> {
    const attendance = await this.findAttendanceById(id);
    await this.attendanceRepository.deleteAttendance(attendance);
    this.rabbit.publishMessage(attendance.userid);
  }
}
