import { inject, injectable } from 'inversify';
import User from '../domain/user';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { AttendanceService } from './attendance.service';
import { AxiosError } from 'axios';
import UserNotFound from '../domain/exceptions/userNotFound';

@injectable()
export default class UserServiceImpl implements UserService {
  @inject('UserRepository') userRepository!: UserRepository;
  @inject('AttendanceService') attendanceService!: AttendanceService;

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async findUserById(id: string): Promise<User> {
    const userFound = await this.userRepository.findUserById(id);
    userFound.attendances = await this.attendanceService.findAllByUser(
      userFound.id
    );
    return userFound;
  }

  async findUserByNickname(nickname: string): Promise<User[]> {
    return await this.userRepository.findUserByNickname(nickname);
  }

  async findUserByFullName(fullName: string): Promise<User[]> {
    return await this.userRepository.findUserByFullName(fullName);
  }

  async updateUser(id: string, user: User): Promise<User> {
    return await this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.attendanceService.deleteAttendancesForUser(id);
    } catch (error) {
      if (error instanceof AxiosError) throw new UserNotFound();
    }
    await this.userRepository.deleteUser(id);
  }

  async updateUserAttendance(id: string, newAttendance: number): Promise<User> {
    const user = await this.findUserById(id);
    user.attendance = newAttendance;
    return this.updateUser(id, user);
  }
}
