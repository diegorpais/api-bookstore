import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';

export class CreateCategoryValidator {
  static validate(data: ICreateCategoryDTO): void {
    const { name } = data;

    // name obrigatório, entre 2 e 100 caracteres
    if (!name || name.trim().length < 2 || name.length > 100) {
      throw new ValidationError("Name must be between 2 and 100 characters");
    }

  }
}