import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { CreateUserBody } from './body/create-user.body';
import {
  CreateUserCommand,
  CreateUserUseCase,
} from '../../application/port/in/create-user.usecase';

export class TokenResponse {
  constructor(public readonly token: string) {}
}

@Controller('v1/users')
export class CreateUserController {
  private readonly logger = new Logger(CreateUserController.name);

  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('/')
  @HttpCode(201)
  async createUser(
    @Body() createUserBody: CreateUserBody,
  ): Promise<TokenResponse> {
    this.logger.debug(`POST /api/v1/users ==> Pending...`);

    const userToken = await this.createUserUseCase.createUser(
      new CreateUserCommand(
        createUserBody.name,
        createUserBody.lastname,
        createUserBody.email,
        createUserBody.password,
        createUserBody.profileImageUrl,
        createUserBody.userConfiguration,
        createUserBody.userStatus,
      ),
    );

    this.logger.debug(`POST /api/v1/users ==> 201`);
    return new TokenResponse(userToken);
  }
}
