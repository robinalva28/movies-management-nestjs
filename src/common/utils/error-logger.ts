import { Logger } from '@nestjs/common';
import { Request } from 'express';

export const errorLogger = (
  logger: Logger,
  req: Request,
  status: number,
  ...messages: string[]
) => {
  logger.error(`${req.method} ${req.url} ${status}`);
  logger.error(`Errors: ${JSON.stringify(messages)}`);
  logger.error(
    `Context: QueryParams ${JSON.stringify(req.query)}, Body ${JSON.stringify(req.body)}`,
  );
};
