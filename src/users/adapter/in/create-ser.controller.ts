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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConflictResponse } from '../../../common/exceptions/filters/conflict-exception.filter';
import { Public } from '../../../common/auth/public.decorator';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';

export class TokenResponse {
  constructor(public readonly token: string) {}
}

@Controller('v1/users')
@ApiTags('users')
export class CreateUserController {
  private readonly logger = new Logger(CreateUserController.name);

  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('/')
  @Public()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiConflictResponse({
    type: ConflictResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  async createUser(
    @Body() createUserBody: CreateUserBody,
  ): Promise<TokenResponse> {
    this.logger.debug(
      `POST /api/v1/users ==> Pending... with body: ${JSON.stringify(createUserBody)}`,
    );

    const userToken = await this.createUserUseCase.createUser(
      new CreateUserCommand(
        createUserBody.name,
        createUserBody.lastname,
        createUserBody.email,
        createUserBody.password,
        createUserBody.profileImageUrl,
      ),
    );

    this.logger.debug(
      `POST /api/v1/users ==> 201 Created with token: ${userToken}`,
    );
    return new TokenResponse(userToken);
  }
}
