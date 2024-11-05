import { Module } from '@nestjs/common';
import { PingController } from './adapter/in/ping.controller';
import { UsersPorts } from './users.ports';
import { CreateUserController } from './adapter/in/create-ser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './adapter/out/persistence/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [PingController, CreateUserController],
  providers: [...UsersPorts],
  exports: [MongooseModule],
})
export class UsersModule {}
