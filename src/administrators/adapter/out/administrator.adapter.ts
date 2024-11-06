import { AdministratorPort } from '../../application/port/out/administrator.port';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdministratorEntity } from './persistence/administrator.schema';
import { Model } from 'mongoose';
import { Administrator } from '../../domain/administrator';
import { AuthAdministratorPort } from '../../application/port/out/auth-administrator.port';
import { RolesEntity } from '../../common/roles/roles.schema';

@Injectable()
export class AdministratorAdapter
  implements AdministratorPort, AuthAdministratorPort
{
  private readonly logger = new Logger(AdministratorAdapter.name);

  constructor(
    @InjectModel(AdministratorEntity.name)
    private readonly administratorSchema: Model<AdministratorEntity>,
    @InjectModel(RolesEntity.name)
    private readonly rolesSchema: Model<RolesEntity>,
  ) {}

  async createAdministrator(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void> {
    const createdAdministrator = new this.administratorSchema({
      name,
      lastname,
      email,
      password,
    });

    await createdAdministrator.save();
  }

  async isEmailUsed(email: string): Promise<boolean> {
    const administratorEntity = await this.administratorSchema
      .findOne({ email })
      .exec();

    return !!administratorEntity;
  }

  async obtainAdministratorByEmail(email: string): Promise<Administrator> {
    const administratorEntity = await this.administratorSchema
      .findOne({ email })
      .exec();

    if (!administratorEntity) return null;

    const administrator = new Administrator();
    administrator.id = administratorEntity.id;
    administrator.name = administratorEntity.name;
    administrator.lastname = administratorEntity.lastname;
    administrator.email = administratorEntity.email;
    administrator.password = administratorEntity.password;
    administrator.createAt = administratorEntity.createdAt;
    administrator.status = administratorEntity.status;
    administrator.lastUpdate = administratorEntity.lastUpdate;
    administrator.roles = administratorEntity.roles;
    administrator.additionalPermissions =
      administratorEntity.additionalPermissions;

    return administrator;
  }

  async obtainPermissionsByRoles(roles: string[]): Promise<string[]> {
    const allPermissions = [];

    for (const role of roles) {
      const actualRole = await this.obtainRoleByRoleName(role);
      if (!actualRole) continue;

      //populate permissions without duplicating values
      actualRole.permissions.forEach((perm: any) => {
        if (!allPermissions.includes(perm)) {
          allPermissions.push(perm);
        }
      });
    }
    return allPermissions;
  }

  async obtainRoleByRoleName(roleName: string): Promise<any> {
    return await this.rolesSchema.findOne({ roleName }).exec();
  }
}
