import { PingService } from './application/service/ping.service';
import { UserService } from './application/service/user.service';
import { UserAdapter } from './adapter/out/user.adapter';
import { UserDomainServiceImpl } from './domain/user.domain-service-impl';

export const UsersPorts = [
  //port in
  { provide: 'GetPingUseCase', useClass: PingService },
  { provide: 'CreateUserUseCase', useClass: UserService },
  { provide: 'UserDomainService', useClass: UserDomainServiceImpl },
  //port out
  { provide: 'UserPort', useClass: UserAdapter },
];
