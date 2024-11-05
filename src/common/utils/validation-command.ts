import { ValidationException } from '../exceptions/validation.exception';
import { validateSync } from 'class-validator';

export class ValidationCommand {
  protected validateSelf() {
    const errors = validateSync(this);

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  }
}
