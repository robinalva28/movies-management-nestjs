import { SetMetadata } from '@nestjs/common';

export const USER_AUTHENTICATED = 'userAuthenticated';

export const UserAuthenticated = () =>
  SetMetadata(USER_AUTHENTICATED, true);
