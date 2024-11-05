import { Injectable } from '@nestjs/common';
import { UserDomainService } from './user.domain-service';
import { User } from './entities/user';

@Injectable()
export class UserDomainServiceImpl implements UserDomainService {
  createUser(user: User): void {
    user.initNewUser();
  }
}
