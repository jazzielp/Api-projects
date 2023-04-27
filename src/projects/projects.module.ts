import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectEntity } from './entities/projects.entity';
import { UserProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserProjectsEntity])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectsModule {}
