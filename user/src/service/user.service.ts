import User from '../domain/user';

export interface UserService {
  findAll(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User>;
  findUserByNickname(nickname: string): Promise<User[]>;
  findUserByFullName(fullName: string): Promise<User[]>;
  updateUser(id: string, user: User): Promise<User>;
  updateUserAttendance(id: string, newAttendance: number): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
