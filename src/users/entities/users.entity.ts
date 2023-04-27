import { IUser } from 'interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ROLES } from '../../constants/roles';
import { BaseEntity } from '../../config/baseentity';
import { UserProjectsEntity } from './usersProjects.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UserProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: UserProjectsEntity[];
}
