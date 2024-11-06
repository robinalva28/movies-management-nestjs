import { UserId } from '../valueObjects/user-id';
import { UserConfiguration } from '../valueObjects/user-configuration';
import { UserStatus } from '../enums/user-status';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

// la idea de que el usuario tenga eeste comportamiento y el userId se genere en el dominio
// es que se pueda adaptar a
// cualquier infraestructura, por ejemplo, si se quiere cambiar de base de datos
// también se puede cambiar el comportamiento de la entidad, es unpequeño fragmento de
// cómo sería utilizar Domain Driven Design
export class User {
  readonly _id: UserId;
  private readonly _name: string;
  private readonly _lastname: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _profileImageUrl: string;
  private _userConfiguration: UserConfiguration;
  private _userStatus: UserStatus;

  // Este metodo permite crear un usuario
  // con los valores que se requieran en base al negocio y su necesidad,
  // de esta forma me evito que se puedan crear usuarios con valores que no correspondan
  // , es más simple ampliar las funcionalidades, ya que toodo se encuentra en un solo lugar
  // y no hace falta tocar mucho este objeto de dominio una vez que el negocio está bien definido y desarrollado
  // también facilita al momento de testear =)

  initNewUser() {
    this._userStatus = UserStatus.ACTIVE;
    this._userConfiguration = UserConfiguration.createDefault();
  }

  // Getters
  get id(): UserId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lastname(): string {
    return this._lastname;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get profileImageUrl(): string {
    return this._profileImageUrl;
  }

  get userConfiguration(): UserConfiguration {
    return this._userConfiguration;
  }

  get userStatus(): UserStatus {
    return this._userStatus;
  }
}

@Injectable()
export class UserBuilder {
  private _id: UserId;
  private _name: string;
  private _lastname: string;
  private _email: string;
  private _password: string;
  private _profileImageUrl: string;
  private _userConfiguration: UserConfiguration;
  private _userStatus: UserStatus;

  constructor() {}

  withId(id: UserId): UserBuilder {
    this._id = id;
    return this;
  }
  withName(name: string): UserBuilder {
    this._name = name;
    return this;
  }

  withLastname(lastname: string): UserBuilder {
    this._lastname = lastname;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this._email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this._password = password;
    return this;
  }

  withProfileImageUrl(profileImageUrl: string): UserBuilder {
    this._profileImageUrl = profileImageUrl;
    return this;
  }

  withUserConfiguration(userConfiguration: UserConfiguration): UserBuilder {
    this._userConfiguration = userConfiguration;
    return this;
  }

  withUserStatus(userStatus: UserStatus): UserBuilder {
    this._userStatus = userStatus;
    return this;
  }

  build(): User {
    return plainToClass(User, this);
  }
}
