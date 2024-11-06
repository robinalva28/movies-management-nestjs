import { Administrator } from '../../../domain/administrator';

export interface AuthAdministratorPort {
  obtainAdministratorByEmail(email: string): Promise<Administrator>;

  obtainPermissionsByRoles(roles: string[]): Promise<string[]>;

  obtainRoleByRoleName(roleName: string): Promise<any>;
}
