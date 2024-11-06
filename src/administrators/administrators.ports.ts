import { AdministratorService } from './application/service/administrator.service';
import { AdministratorAdapter } from './adapter/out/administrator.adapter';
import { AuthService } from './application/service/auth.service';

export const AdministratorsPorts = [
  //Ports in:
  { provide: 'CreateAdministratorUseCase', useClass: AdministratorService },
  { provide: 'AuthAdministratorUseCase', useClass: AuthService },

  //Ports out:
  { provide: 'AdministratorPort', useClass: AdministratorAdapter },
  { provide: 'AuthAdministratorPort', useClass: AdministratorAdapter },
];
