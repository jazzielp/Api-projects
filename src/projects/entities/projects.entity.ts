import { IPorject } from 'interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../config/baseentity';
import { UserProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IPorject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserProjectsEntity, (userProject) => userProject.project)
  usersIncludes: UserProjectsEntity[];
}
