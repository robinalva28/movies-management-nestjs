import { Controller, Get, Inject } from '@nestjs/common';
import GetPingUseCase from '../../application/port/in/get-ping.usecase';

class PingResponse {
  constructor(public readonly message: string) {}
}

@Controller('api/ping')
export class PingController {
  constructor(
    @Inject('GetPingUseCase')
    private readonly getPingUseCase: GetPingUseCase,
  ) {}

  @Get()
  async getPing(): Promise<PingResponse> {
    return new PingResponse(await this.getPingUseCase.getPing());
  }
}
