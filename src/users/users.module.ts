import { Module } from '@nestjs/common';
import { UsersPorts } from './users.ports';
import { CreateUserController } from './adapter/in/create-ser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './adapter/out/persistence/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UserSignInController } from './adapter/in/user-sign-in.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [CreateUserController, UserSignInController],
  providers: [...UsersPorts],
  exports: [MongooseModule],
})
export class UsersModule {}
