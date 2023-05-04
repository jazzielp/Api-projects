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

import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dtos/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  public async register(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }

  @Roles('BASIC')
  @Get('all')
  public async findAll() {
    return await this.userService.find();
  }

  @PublicAccess()
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDTO) {
    return await this.userService.relationToProject(body);
  }

  @Put('edit/:id')
  public async update(@Param('id') id: string, @Body() body: UserUpdateDTO) {
    return await this.userService.update(id, body);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
