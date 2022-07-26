import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nickname!: string;

  @Column()
  fullName!: string;

  @Column()
  age!: number;

  @Column({ default: 0 })
  attendance!: number;
}
