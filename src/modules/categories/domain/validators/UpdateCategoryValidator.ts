import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO';

export class UpdateCategoryValidator {
  static validate(patch: IUpdateCategoryDTO): void {
    const { name, description } = patch;

    if (name === undefined && description === undefined) {
      throw new ValidationError("At least one field must be provided");
    }

    if (name !== undefined) {
      const n = name.trim();
      if (n.length === 0) {
        throw new ValidationError("Name must not be empty");
      }

      if (n.length < 2 || n.length > 255) {
        throw new ValidationError("Name must be between 2 and 255 characters");
      }
    }

    if (description !== undefined) {
      const d = description.trim();
      if (d.length === 0) {
        throw new ValidationError("Description must not be empty");
      }

      if (d.length > 1000) {
        throw new ValidationError("Description must be at most 1000 characters");
      }
    }
  }
}