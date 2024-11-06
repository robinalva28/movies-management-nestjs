import { Request } from 'express';
import { JwtPayloadKey } from './constants/jwtPayloadKey';

export const getPayloadTokenFromRequest = (request: Request) => {
  return request[JwtPayloadKey];
};
