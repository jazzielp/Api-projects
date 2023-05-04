import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UsersService } from 'src/users/services/users.service';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interface/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['codrr_token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.IsExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const { sub } = manageToken;
    const user = await this.userService.findById(sub);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    req.idUser = user.id;
    req.roleUser = user.role;
    console.log(req.idUser);
    console.log(req.roleUser);
    return true;
  }
}
