import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtPayloadKey } from './constants/jwtPayloadKey';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { PERMISSION_KEY } from '../../administrators/common/roles/roles.decorator';
import { PermissionsEnum } from '../../administrators/common/permissions/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  logger = new Logger(PermissionsGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredPermission = this.reflector.get<PermissionsEnum>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();

    // obtain permissions from decoded token
    const permissions = request[JwtPayloadKey].permissions;

    if (!permissions || !permissions.includes(requiredPermission)) {
      this.logger.debug(
        `Token unauthorized, permissions required =  ${requiredPermission}`,
      );
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
