import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  AuthAdministratorCommand,
  AuthAdministratorUseCase,
} from '../port/in/auth-administrator.usecase.ts';
import { AuthAdministratorPort } from '../port/out/auth-administrator.port';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { TokenView } from '../../adapter/in/view/token.view';
import { Administrator } from '../../domain/administrator';

@Injectable()
export class AuthService implements AuthAdministratorUseCase {
  private logger = new Logger(AuthService.name);

  constructor(
    @Inject('AuthAdministratorPort')
    private readonly authAdministratorPort: AuthAdministratorPort,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(command: AuthAdministratorCommand): Promise<TokenView> {
    const { email, password } = command;

    // Obtain the administrator and deconstruct it, or throw error if not exists
    const administratorObtained =
      await this.obtainAdministratorByEmailOrThrowException(email);

    const {
      password: passwordDB,
      id,
      name,
      lastname,
      roles,
      additionalPermissions,
    } = administratorObtained;

    // match the administrator's password or throw error
    await this.doesPasswordsMatchOrThrowException(password, passwordDB);

    // Unify all permissions from roles and additional permissions
    const permissions =
      await this.authAdministratorPort.obtainPermissionsByRoles(roles);

    permissions.push(...additionalPermissions);

    const payload = { id, name, lastname, roles, permissions };

    this.logger.debug(`Logging in for email ${email}...`);
    return { token: this.jwtService.sign(payload) };
  }

  private async doesPasswordsMatchOrThrowException(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<void> {
    if (!(await bcrypt.compare(plainPassword, encryptedPassword))) {
      this.logger.error(`Password does not match`);
      throw new UnauthorizedException(`Password does not match`);
    }
  }

  private async obtainAdministratorByEmailOrThrowException(
    email: string,
  ): Promise<Administrator | never> {
    const administratorObtained =
      await this.authAdministratorPort.obtainAdministratorByEmail(email);

    if (!administratorObtained) {
      this.logger.error(`Administrator not found, email = ` + email);
      throw new UnauthorizedException(`Administrator not found`);
    }

    return administratorObtained;
  }
}
