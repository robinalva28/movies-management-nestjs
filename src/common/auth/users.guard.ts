import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { Reflector } from '@nestjs/core';
import { USER_AUTHENTICATED } from './users-auth.decorator';
import { JwtPayloadKey } from './constants/jwtPayloadKey';

@Injectable()
export class UsersGuard implements CanActivate {
  private readonly logger = new Logger(UsersGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isUseCaseForProviderAuth = this.reflector.getAllAndOverride<boolean>(
      USER_AUTHENTICATED,
      [context.getHandler(), context.getClass()],
    );

    if (!isUseCaseForProviderAuth) return true;

    const request = context.switchToHttp().getRequest();
    const token = request[JwtPayloadKey];

    if (!token.providerId) {
      this.logger.error(
        `Forbidden access to ${request.route.path} for email,id,userId = ${token.email},${token.id},${token.userId}`,
      );
      throw new ForbiddenException('Forbidden');
    }

    return true;
  }
}
