export enum AdministratorStatus {
  HA = 'HA', //Habilitated
  DEL = 'DEL', //Deleted
}

export class Administrator {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createAt: Date;
  status: AdministratorStatus;
  lastUpdate: Date;
  roles: string[];
  additionalPermissions: string[];
}
