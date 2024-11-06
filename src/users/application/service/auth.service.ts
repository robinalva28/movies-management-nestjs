import * as bcrypt from 'bcrypt';
import { SignInCommand, SignInUseCase } from '../port/in/sign-in.usecase';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenView } from '../../adapter/in/view/token.view';
import { UserAdapter } from '../../adapter/out/user.adapter';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { User } from '../../domain/entities/user';

@Injectable()
export class AuthService implements SignInUseCase {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('UserPort') private readonly userPort: UserAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(command: SignInCommand): Promise<TokenView> {
    const { password: plainPassword } = command;
    const { email } = command;

    const userFromDb = await this.userPort.getUserByEmail(command.email);

    if (!userFromDb) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const {
      name,
      lastname,
      password: hashedPassword,
      userStatus,
      profileImageUrl,
    } = userFromDb;

    this.logger.debug('Checking password...');
    const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.debug('Generating token...');
    const payload = {
      email,
      name,
      lastname,
      profileImageUrl,
      userStatus,
    };
    return { token: this.getJWTFromUserPayload(payload) };
  }

  private getJWTFromUserPayload(userPartial: Partial<User>) {
    return this.jwtService.sign({
      email: userPartial.email,
      name: userPartial.name,
      lastname: userPartial.lastname,
      profileImageUrl: userPartial.profileImageUrl,
      userStatus: userPartial.userStatus,
    });
  }
}
