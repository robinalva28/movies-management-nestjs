import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UnauthorizedException } from '../unauthorized.exception';
import { ApiProperty } from '@nestjs/swagger';
import { errorLogger } from '../../utils/error-logger';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const unauthorizedStatus = HttpStatus.UNAUTHORIZED;

    const unauthorizedResponse: UnauthorizedResponse = {
      statusCode: unauthorizedStatus,
      timestamp: new Date().toISOString(),
      error: exception.message,
    };

    errorLogger(
      this.logger,
      request,
      unauthorizedStatus,
      unauthorizedResponse.error,
    );

    response.status(unauthorizedStatus).json(unauthorizedResponse);
  }
}

export class UnauthorizedResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: 'Wrong credentials' })
  error: string;
}
