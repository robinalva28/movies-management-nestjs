import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InternalServerErrorException } from '../internal-server-error.exception';
import { ApiProperty } from '@nestjs/swagger';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { errorLogger } from '../../utils/error-logger';

@Catch(InternalServerErrorException, ExceptionsHandler)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(InternalServerErrorExceptionFilter.name);

  catch(exception: InternalServerErrorException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const internalErrorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const internalServerErrorResponse: InternalServerErrorResponse = {
      statusCode: internalErrorStatus,
      timestamp: new Date().toISOString(),
      error: 'Internal server error',
    };

    errorLogger(this.logger, request, internalErrorStatus, exception.stack);

    response.status(internalErrorStatus).json(internalServerErrorResponse);
  }
}

export class InternalServerErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Internal server error' })
  error: string;
}
