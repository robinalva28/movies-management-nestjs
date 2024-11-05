import {
  Body,
  Controller,
  HttpCode,
  HttpStatus, Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { SignInBody } from './body/sign-in.body';
import {
  SignInCommand,
  SignInUseCase,
} from '../../application/port/in/sign-in.usecase';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProperty, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { UnauthorizedResponse } from '../../../common/exceptions/filters/unauthorized-exception.filter';
import { ConflictResponse } from '../../../common/exceptions/filters/conflict-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';

export class SignInAdministratorResponse {
  @ApiProperty({
    example:
      'JWTaseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.JWTaseyJhbGciOiJIUzI1NiIsInR5cCI6df4tq2km',
  })
  token: string;
}

@Controller('v1/users')
@ApiTags('users')
export class UserSignInController {
  private readonly logger = new Logger(UserSignInController.name);

  constructor(@Inject('UserSignInUseCase')private readonly userSignInUseCase: SignInUseCase) {}

  @Post('/auth/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SignInAdministratorResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  async signIn(@Body() body: SignInBody) {
    this.logger.debug(
      `POST /api/v1/users/auth/sign-in ==> Pending... with body: ${JSON.stringify(body.email)}`,
    );

    const token = await this.userSignInUseCase.signIn(
      new SignInCommand(body.email, body.password),
    );

    this.logger.debug(
      `POST /api/v1/users/auth/sign-in ==> User signed in with email: ${body.email}`,
    );
    return token;
  }
}
