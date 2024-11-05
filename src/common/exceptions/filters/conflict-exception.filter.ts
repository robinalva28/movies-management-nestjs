import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BusinessException } from '../business.exception';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { errorLogger } from '../../utils/error-logger';

@Catch(BusinessException)
export class ConflictExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ConflictExceptionFilter');

  catch(exception: BusinessException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const conflictStatus = HttpStatus.CONFLICT;

    const conflictResponse: ConflictResponse = {
      statusCode: conflictStatus,
      timestamp: new Date().toISOString(),
      error: exception.message,
    };

    errorLogger(this.logger, request, conflictStatus, conflictResponse.error);

    response.status(conflictStatus).json(conflictResponse);
  }
}

export class ConflictResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Business Error Message' })
  error: string;
}
