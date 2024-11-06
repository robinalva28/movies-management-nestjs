export interface AdministratorPort {
  isEmailUsed(email: string): Promise<boolean>;

  createAdministrator(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void>;
}
