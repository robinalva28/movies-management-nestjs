import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ForbiddenException } from '../forbidden.exception';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { errorLogger } from '../../utils/error-logger';

@Catch(ForbiddenException, ExceptionsHandler)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ForbiddenExceptionFilter.name);

  catch(exception: ForbiddenException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const forbiddenError = HttpStatus.FORBIDDEN;
    const forbiddenStatus = 403;

    const forbiddenResponse: ForbiddenResponse = {
      statusCode: forbiddenStatus,
      timestamp: new Date().toISOString(),
      error: exception.message,
    };

    errorLogger(this.logger, request, forbiddenError, forbiddenResponse.error);

    response.status(forbiddenError).json(forbiddenResponse);
  }
}

export class ForbiddenResponse {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}
