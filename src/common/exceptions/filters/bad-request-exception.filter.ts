import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationException } from '../validation.exception';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { errorLogger } from '../../utils/error-logger';

@Catch(ValidationException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('BadRequestExceptionFilter');

  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const badRequestStatus = HttpStatus.BAD_REQUEST;

    //Only the first error is returned to the client
    const errors = exception.errors
      .map((error) => error.constraints)
      .map((constraint) => {
        //The key of the first error
        const key = Object.keys(constraint)[0];
        return constraint[key];
      });

    const badRequestResponse: BadRequestResponse = {
      statusCode: badRequestStatus,
      timestamp: new Date().toISOString(),
      errors: errors,
    };

    errorLogger(this.logger, request, badRequestStatus, ...errors);

    response.status(badRequestStatus).json(badRequestResponse);
  }
}

export class BadRequestResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: ['Validation Error'] })
  errors: string[];
}
