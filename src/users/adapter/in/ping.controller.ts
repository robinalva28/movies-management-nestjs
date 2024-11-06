import { Controller, Get, Inject } from '@nestjs/common';
import GetPingUseCase from '../../application/port/in/get-ping.usecase';
import { Public } from 'src/common/auth/public.decorator';

class PingResponse {
  constructor(public readonly message: string) {}
}

@Controller('/ping')
export class PingController {
  constructor(
    @Inject('GetPingUseCase')
    private readonly getPingUseCase: GetPingUseCase,
  ) {}

  @Get()
  @Public()
  async getPing(): Promise<PingResponse> {
    return new PingResponse(await this.getPingUseCase.getPing());
  }
}
