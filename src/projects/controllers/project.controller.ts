import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';

@Controller('projects')
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

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.projectService.findById(id);
  }

  @Put('edit/:id')
  public async update(@Param('id') id: string, @Body() body: ProjectUpdateDTO) {
    return await this.projectService.update(id, body);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    return await this.projectService.delete(id);
  }
}
