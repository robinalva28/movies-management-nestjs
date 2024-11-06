import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdministratorEntity,
  AdministratorSchema,
} from './adapter/out/persistence/administrator.schema';
import { RolesEntity, RolesSchema } from './common/roles/roles.schema';
import { ConfigModule } from '@nestjs/config';
import { CreateAdministratorController } from './adapter/in/create-administrator.controller';
import { SigninAdministratorController } from './adapter/in/signin-administrator.controller';
import { AdministratorsPorts } from './administrators.ports';
import { RoleService } from './application/service/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdministratorEntity.name, schema: AdministratorSchema },
      { name: RolesEntity.name, schema: RolesSchema },
      //...
    ]),
    ConfigModule.forRoot(),
  ],
  // ------------------------------------------- CONTROLLERS
  controllers: [CreateAdministratorController, SigninAdministratorController],
  // ------------------------------------------- PROVIDERS
  providers: [...AdministratorsPorts, RoleService],
  // ------------------------------------------- EXPORTS
  exports: [MongooseModule],
})
export class AdministratorsModule {}
