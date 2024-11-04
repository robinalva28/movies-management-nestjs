import { PingService } from './application/service/ping.service';

export const UsersPorts = [
  //port in
  { provide: 'GetPingUseCase', useClass: PingService },
  //port out
];
