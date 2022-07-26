import { injectable } from 'inversify';
import { MongoRepository } from 'typeorm';
import { Attendance } from '../domain/attendance';
import { AttendanceNotFound } from '../domain/exceptions/attendanceNotFound';
import EmptyProperty from '../domain/exceptions/emptyProperty';
import { AttendanceRepository } from '../repository/attendance.repository';
import { AppDataSource } from './persistence/db.config';
import { AttendanceEntity } from './persistence/entities/attendance.entity';
import { AttendanceMapper } from './persistence/mappers/attendance.mapper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongodb').ObjectId;
@injectable()
export class AttendanceRepositoryImpl implements AttendanceRepository {
  private attendanceRepositoryORM: MongoRepository<AttendanceEntity>;

  constructor() {
    this.attendanceRepositoryORM =
      AppDataSource.getMongoRepository(AttendanceEntity);
  }

  async createAttendance(attendance: Attendance): Promise<Attendance> {
    const attendanceEntity = await this.attendanceRepositoryORM.save(
      AttendanceMapper.toEntity(attendance)
    );
    return AttendanceMapper.toDomain(attendanceEntity);
  }

  async findAllByUser(userId: string): Promise<Attendance[]> {
    if (!userId) throw new EmptyProperty(userId);
    const foundAttendance = await this.attendanceRepositoryORM.find({
      where: { userid: userId },
    });
    if (!foundAttendance) throw new AttendanceNotFound();
    return AttendanceMapper.toDomainList(foundAttendance);
  }

  async findAttendanceById(id: string): Promise<Attendance> {
    if (!id) throw new EmptyProperty(id);
    const foundAttendance = await this.attendanceRepositoryORM.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!foundAttendance) throw new AttendanceNotFound();
    return AttendanceMapper.toDomain(foundAttendance);
  }

  async deleteAttendancesForUser(userId: string): Promise<void> {
    const attendances = await this.findAllByUser(userId);
    await this.attendanceRepositoryORM.remove(
      AttendanceMapper.toEntityList(attendances)
    );
  }

  async deleteAttendance(attendance: Attendance): Promise<void> {
    await this.attendanceRepositoryORM.remove(
      AttendanceMapper.toEntity(attendance)
    );
  }
}
