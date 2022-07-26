import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class AttendanceEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ nullable: false })
  userid!: string;

  @Column({ nullable: false })
  startTime!: string;

  @Column({ nullable: false })
  endTime!: string;

  @Column({ nullable: false })
  date!: Date;

  @Column({ nullable: false })
  notes!: string;
}
