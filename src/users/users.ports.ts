import { PingService } from './application/service/ping.service';
import { UserService } from './application/service/user.service';
import { UserAdapter } from './adapter/out/user.adapter';

export const UsersPorts = [
  //port in
  { provide: 'GetPingUseCase', useClass: PingService },
  { provide: 'CreateUserUseCase', useClass: UserService },
  //port out
];
