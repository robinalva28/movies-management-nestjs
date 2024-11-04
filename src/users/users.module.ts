import { Module } from '@nestjs/common';
import { PingController } from './adapter/in/ping.controller';
import { UsersPorts } from './users.ports';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [...UsersPorts],
})
export class UsersModule {}
