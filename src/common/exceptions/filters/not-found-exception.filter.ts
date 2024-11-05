import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { NotFoundException } from '../not-found.exception';
import { ApiProperty } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { errorLogger } from '../../utils/error-logger';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('NotFoundExceptionFilter');

  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const notFoundStatus = HttpStatus.NOT_FOUND;

    const notFoundResponse: NotFoundResponse = {
      statusCode: notFoundStatus,
      timestamp: new Date().toISOString(),
      error: exception.message,
    };

    errorLogger(this.logger, request, notFoundStatus, notFoundResponse.error);

    response.status(notFoundStatus).json(notFoundResponse);
  }
}

export class NotFoundResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Not Found Exception Message' })
  error: string;
}
