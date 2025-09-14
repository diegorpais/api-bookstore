import { PaginationParamsDTO } from '../../domain/dtos/PaginationParamsDTO';
import { ValidationError } from '../errors/ValidationError';

export class PaginationValidator {
  static validate(params: PaginationParamsDTO, maxLimit: number = 50): void {
    const { page, limit } = params;

    if (page < 1) {
      throw new ValidationError('Page must be greater than 0');
    }

    if (limit < 1 || limit > maxLimit) {
      throw new ValidationError(`Limit must be between 1 and ${maxLimit}`);
    }
  }
}