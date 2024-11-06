import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesEntity } from '../../common/roles/roles.schema';

const ROLES = [
  {
    roleName: 'ROLE_ADMINISTRATOR_FULL_ACCESS',
    permissions: [
      'Movies.create',
      'Movies.write.update',
      'Movies.delete',
      'Administrators.create',
    ],
  },
  {
    roleName: 'ROLE_ADMINISTRATOR_ONLY_CREATE',
    permissions: ['Movies.create', 'Administrators.create'],
  },
  {
    roleName: 'ROLE_ADMINISTRATOR_ONLY_UPDATE',
    permissions: ['Movies.write.update', 'Administrators.create'],
  },
  {
    roleName: 'ROLE_ADMINISTRATOR_ONLY_DELETE',
    permissions: ['Movies.delete', 'Administrators.create'],
  },
];

@Injectable()
export class RoleService implements OnModuleInit {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    @InjectModel(RolesEntity.name)
    private readonly roleModel: Model<RolesEntity>,
  ) {}

  async onModuleInit() {
    for (const role of ROLES) {
      await this.roleModel.updateOne(
        { roleName: role.roleName },
        { $set: role },
        { upsert: true },
      );
    }
    this.logger.debug('Roles persisted');
  }
}
