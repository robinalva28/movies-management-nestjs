import { PingService } from './application/service/ping.service';
import { UserService } from './application/service/user.service';
import { UserAdapter } from './adapter/out/user.adapter';
import { UserDomainServiceImpl } from './domain/user.domain-service-impl';
import { AuthService } from './application/service/auth.service';

export const UsersPorts = [
  //port in
  { provide: 'GetPingUseCase', useClass: PingService },
  { provide: 'CreateUserUseCase', useClass: UserService },
  { provide: 'UserDomainService', useClass: UserDomainServiceImpl },
  { provide: 'UserSignInUseCase', useClass: AuthService },
  //port out
  { provide: 'UserPort', useClass: UserAdapter },
];
