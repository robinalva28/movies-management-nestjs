import { SignInCommand } from '../port/in/sign-in.usecase';
import { AuthService } from './auth.service';
import { UserAdapter } from '../../adapter/out/user.adapter';
import { JwtService } from '@nestjs/jwt';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { UserStatus } from '../../domain/enums/user-status';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let userPort: UserAdapter;
  let jwtService: JwtService;

  beforeEach(async () => {
    userPort = mock<UserAdapter>();
    jwtService = mock<JwtService>();
    authService = new AuthService(instance(userPort), instance(jwtService));
  });

  describe('signIn', () => {
    it('should throw an UnauthorizedException when user does not exist', async () => {
      // Given
      const command = new SignInCommand('example@mail.com', 'password');
      when(userPort.getUserByEmail(anything())).thenResolve(null);

      // When - then
      await expect(authService.signIn(command)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException when password is invalid', async () => {
      // Given
      const command = new SignInCommand('email@domain.com', 'password');

      when(userPort.getUserByEmail(command.email)).thenResolve({
        email: command.email,
        password: 'hashedPassword',
      });

      when(jwtService.sign(anything())).thenReturn('token');

      // When - Then
      await expect(authService.signIn(command)).rejects.toThrow(
        UnauthorizedException,
      );

      // Verify
      verify(jwtService.sign(anything())).never();
    });

    it('should return a token when user and password are valid', async () => {
      // Given
      const command = new SignInCommand('email@domain.com', 'password');

      when(userPort.getUserByEmail(command.email)).thenResolve({
        email: command.email,
        password: 'hashedPassword',
        name: 'John',
        lastname: 'Doe',
        profileImageUrl: 'image_url',
        userStatus: UserStatus.ACTIVE,
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      when(jwtService.sign(anything())).thenReturn('token');

      // When
      const result = await authService.signIn(command);

      // Then
      expect(result.token).toBe('token');
      verify(jwtService.sign(anything())).once();
    });
  });
});
