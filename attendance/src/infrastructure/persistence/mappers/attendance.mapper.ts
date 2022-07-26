import { Attendance } from '../../../domain/attendance';
import { AttendanceEntity } from '../entities/attendance.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongodb').ObjectId;
export class AttendanceMapper {
  static toDomain(entity: AttendanceEntity): Attendance {
    const domain = new Attendance(
      entity._id.toString(),
      entity.userid,
      entity.startTime,
      entity.endTime,
      entity.date,
      entity.notes
    );
    return domain;
  }

  static toEntity(domain: Attendance): AttendanceEntity {
    const entity = new AttendanceEntity();
    entity._id = new ObjectId(domain._id);
    entity.userid = domain.userid;
    entity.startTime = domain.startTime;
    entity.endTime = domain.endTime;
    entity.date = domain.date;
    entity.notes = domain.notes;
    return entity;
  }

  static toDomainList(entities: AttendanceEntity[]): Attendance[] {
    return entities.map((entity) => {
      return this.toDomain(entity);
    });
  }

  static toEntityList(domains: Attendance[]): AttendanceEntity[] {
    return domains.map((domain) => {
      return this.toEntity(domain);
    });
  }
}
