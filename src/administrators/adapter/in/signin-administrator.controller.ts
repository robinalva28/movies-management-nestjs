import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SigninAdministratorBody } from './body/signin-administrator.body';
import {
  AuthAdministratorCommand,
  AuthAdministratorUseCase,
} from '../../application/port/in/auth-administrator.usecase.ts';
import { UnauthorizedResponse } from '../../../common/exceptions/filters/unauthorized-exception.filter';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';
import { ConflictResponse } from '../../../common/exceptions/filters/conflict-exception.filter';
import { TokenView } from './view/token.view';
import { Public } from '../../../common/auth/public.decorator';

export class SignInAdministratorResponse {
  @ApiProperty({
    example:
      'JWTaseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.JWTaseyJhbGciOiJIUzI1NiIsInR5cCI6df4tq2km',
  })
  token: string;
}

@Controller('/v1/administrators')
@ApiTags('Administrators')
export class SigninAdministratorController {
  private readonly logger = new Logger(SigninAdministratorController.name);

  constructor(
    @Inject('AuthAdministratorUseCase')
    private readonly signinUseCase: AuthAdministratorUseCase,
  ) {}

  @Post('/auth/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in an administrator' })
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
  async signInAdministrator(
    @Body() body: SigninAdministratorBody,
  ): Promise<TokenView> {
    this.logger.debug(
      'POST ==> /v1/administrators/auth/signin ==> Pending... ' + body.email,
    );

    const token: TokenView = await this.signinUseCase.signIn(
      new AuthAdministratorCommand(body.email, body.password),
    );

    this.logger.debug(
      'POST ==> /v1/administrators/auth/signin ==> OK ' + body.email,
    );
    return token;
  }
}
