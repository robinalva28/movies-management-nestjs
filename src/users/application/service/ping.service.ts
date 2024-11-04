import GetPingUseCase from '../port/in/get-ping.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService implements GetPingUseCase {
  constructor() {}

  async getPing() {
    return 'pong';
  }
}
