import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateAdministratorCommand,
  CreateAdministratorUseCase,
} from '../port/in/create-administrator.usecase';
import { AdministratorPort } from '../port/out/administrator.port';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '../../../common/exceptions/business.exception';

@Injectable()
export class AdministratorService implements CreateAdministratorUseCase {
  private readonly logger = new Logger('AdministratorService');

  constructor(
    @Inject('AdministratorPort')
    private readonly administratorPort: AdministratorPort,
  ) {}

  async createAdministrator(
    command: CreateAdministratorCommand,
  ): Promise<void> {
    const { password } = command;

    await this.validateEmail(command.email);

    this.logger.debug('Hashing password...');

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    this.logger.debug(`Creating administrator...`);

    await this.administratorPort.createAdministrator(
      command.name,
      command.lastname,
      command.email,
      passwordHash,
    );
  }

  private async validateEmail(email: string) {
    this.logger.debug(`Validate email ${email}`);

    const isEmailUsed = await this.administratorPort.isEmailUsed(email);

    if (isEmailUsed) {
      throw new BusinessException('The email is used');
    }
  }
}
