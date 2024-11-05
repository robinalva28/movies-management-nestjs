import { ValidationError } from 'class-validator';

export class ValidationException extends Error {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;
  }
}
