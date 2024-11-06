import { UserService } from './user.service';
import { UserPort } from '../port/out/user-port';
import { UserDomainService } from '../../domain/user.domain-service';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { CreateUserCommand } from '../port/in/create-user.usecase';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ExistUserByEmailCommand } from '../port/in/exist-user-by-email.usecase';

describe('UserService', () => {
  let userService: UserService;
  let userPortMock: UserPort;
  let userDomainServiceMock: UserDomainService;

  beforeEach(() => {
    userPortMock = mock<UserPort>();
    userDomainServiceMock = mock<UserDomainService>();
    userService = new UserService(
      instance(userPortMock),
      instance(userDomainServiceMock),
    );
  });

  describe('createUser', () => {
    it('should throw BusinessException if user already exists', async () => {
      // Given
      const command = new CreateUserCommand(
        'John',
        'Doe',
        'email@example.com',
        'password',
        'image_url',
      );
      when(userPortMock.existsUserByEmail(command.email)).thenResolve(true);

      // When -Then
      await expect(userService.createUser(command)).rejects.toThrow(
        BusinessException,
      );
      verify(userPortMock.existsUserByEmail(command.email)).once();
    });

    it('should save user when email does not exist', async () => {
      // Given
      const command = new CreateUserCommand(
        'John',
        'Doe',
        'email@example.com',
        'password',
        'image_url',
      );
      when(userPortMock.existsUserByEmail(command.email)).thenResolve(false);
      when(userPortMock.saveUser(anything())).thenResolve();
      when(userDomainServiceMock.createUser(anything())).thenReturn();

      // when
      const result = await userService.createUser(command);

      // Then
      expect(result).toBe('token');
      verify(userPortMock.saveUser(anything())).once();
      verify(userDomainServiceMock.createUser(anything())).once();
    });
  });

  describe('existUserByEmail', () => {
    it('should return true if user exists by email', async () => {
      // Given
      const command = new ExistUserByEmailCommand('email@example.com');
      when(userPortMock.existsUserByEmail(command.email)).thenResolve(true);

      // When
      const result = await userService.existUserByEmail(command);

      // Then
      expect(result).toBe(true);
      verify(userPortMock.existsUserByEmail(command.email)).once();
    });

    it('should return false if user does not exist by email', async () => {
      // Given
      const command = new ExistUserByEmailCommand('email@example.com');
      when(userPortMock.existsUserByEmail(command.email)).thenResolve(false);

      // When
      const result = await userService.existUserByEmail(command);

      // Then
      expect(result).toBe(false);
      verify(userPortMock.existsUserByEmail(command.email)).once();
    });
  });
});
