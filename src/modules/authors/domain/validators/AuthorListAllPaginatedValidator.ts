import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ValidationError } from '../../../../shared/http/errors/ValidationError';

export class AuthorListAllPaginatedValidator {
  static validate(params: PaginationParamsDTO): void {
    const { page, limit } = params;

    if (page < 1) {
      throw new ValidationError('Page must be greater than 0');
    }

    if (limit < 1 || limit > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }
  }
}