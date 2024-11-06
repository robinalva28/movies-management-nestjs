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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAdministratorCommand,
  CreateAdministratorUseCase,
} from '../../application/port/in/create-administrator.usecase';
import { CreateAdministratorRequestBody } from './body/create-administrator.body';
import { ConflictResponse } from '../../../common/exceptions/filters/conflict-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';
import { Public } from '../../../common/auth/public.decorator';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { ForbiddenResponse } from '../../../common/exceptions/filters/forbidden-exception.filter';

//@ApiBearerAuth()
@Controller('/v1/administrators')
@ApiTags('Administrators')
export class CreateAdministratorController {
  private readonly logger = new Logger('CreateAdministratorController');

  constructor(
    @Inject('CreateAdministratorUseCase')
    private readonly createAdministratorUseCase: CreateAdministratorUseCase,
  ) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  //@Permission(PermissionsEnum.ADMINISTRATORS_CREATE)
  @ApiOperation({ summary: 'Create an administrator' })
  @ApiCreatedResponse({
    description: 'Administrator created',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  async createAdministrator(
    @Body() body: CreateAdministratorRequestBody,
  ): Promise<void> {
    this.logger.debug('POST ==> /api/v1/administrators ==> Pending...');

    await this.createAdministratorUseCase.createAdministrator(
      new CreateAdministratorCommand(
        body.name,
        body.lastname,
        body.email,
        body.password,
      ),
    );

    this.logger.debug('POST ==> /api/v1/administrators ==> OK');
  }
}
