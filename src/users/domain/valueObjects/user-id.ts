import { v4 as uuidv4 } from 'uuid';

export class UserId {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value || uuidv4();
  }

  public static generate(): UserId {
    return new UserId(uuidv4());
  }

  get value(): string {
    return this._value;
  }
}
