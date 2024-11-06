import { PermissionsEnum } from '../permissions/permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';
export const Permission = (permission: PermissionsEnum) =>
  SetMetadata(PERMISSION_KEY, permission);
