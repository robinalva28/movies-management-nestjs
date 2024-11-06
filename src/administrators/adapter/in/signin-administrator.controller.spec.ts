import { Test, TestingModule } from '@nestjs/testing';
import { SigninAdministratorController } from './signin-administrator.controller';
import { TokenView } from './view/token.view';
import * as request from 'supertest';
import {
  BadRequestException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { AuthAdministratorUseCase } from '../../application/port/in/auth-administrator.usecase.ts';

describe('SigninAdministratorController', () => {
  let app: INestApplication;
  let useCase: AuthAdministratorUseCase;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SigninAdministratorController],
      providers: [
        {
          provide: 'AuthAdministratorUseCase',
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    useCase = moduleFixture.get<AuthAdministratorUseCase>(
      'AuthAdministratorUseCase',
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /v1/administrators/auth/signin', () => {
    it('should return a token', async () => {
      const expectedToken: TokenView = { token: 'mockToken' };
      jest.spyOn(useCase, 'signIn').mockResolvedValueOnce(expectedToken);

      const body = { email: 'test@example.com', password: 'password' };
      const response = await request(app.getHttpServer())
        .post('/v1/administrators/auth/signin')
        .send(body);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual(expectedToken);
      expect(useCase.signIn).toHaveBeenCalledWith(
        expect.objectContaining({
          email: body.email,
          password: body.password,
        }),
      );
    });

    it('should return a bad request error', async () => {
      jest
        .spyOn(useCase, 'signIn')
        .mockRejectedValueOnce(new BadRequestException('Invalid credentials'));

      const body = { email: 'test@example.com', password: 'password' };
      const response = await request(app.getHttpServer())
        .post('/v1/administrators/auth/signin')
        .send(body);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid credentials',
        error: 'Bad Request',
      });
      expect(useCase.signIn).toHaveBeenCalledWith(
        expect.objectContaining({
          email: body.email,
          password: body.password,
        }),
      );
    });
  });
});
