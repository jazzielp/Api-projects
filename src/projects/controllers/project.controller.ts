import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('register')
  public async register(@Body() body: ProjectDTO) {
    return await this.projectService.create(body);
  }

  @Get('all')
  public async findAll() {
    return await this.projectService.find();
  }

  @Get(':projectId')
  public async findById(@Param('projectId') id: string) {
    return await this.projectService.findById(id);
  }

  @AccessLevel(50)
  @Put('edit/:projectId')
  public async update(
    @Param('projectId') id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.update(id, body);
  }

  @Delete('delete/:projectId')
  public async delete(@Param('projectId') id: string) {
    return await this.projectService.delete(id);
  }
}
