import { UUID } from 'crypto';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  userid: UUID;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Column({ type: 'integer', defaultValue: 1 })
  status?: number;

  @Column
  userPictureUrl?: string;

  @Column
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ field: 'created_at' })
  createdAt?: Date;

  @Column({ field: 'updated_at' })
  updatedAt?: Date;
}
