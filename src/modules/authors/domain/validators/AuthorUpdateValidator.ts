import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { IUpdateAuthorDTO } from '../dtos/IUpdateAuthorDTO';

export class AuthorUpdateValidator {
  static validate(patch: IUpdateAuthorDTO): void {
    const { name, biography, birthDate, nationality } = patch;

    if (
      name === undefined &&
      biography === undefined &&
      birthDate === undefined &&
      nationality === undefined
    ) {
      throw new ValidationError("At least one field must be provided", 400);
    }

    if (name !== undefined) {
      const n = name.trim();
      if (n.length < 2 || n.length > 255) {
        throw new ValidationError("Name must be between 2 and 255 characters");
      }
    }

    if (biography !== undefined && biography.length > 2000) {
      throw new ValidationError("Biography must be at most 2000 characters");
    }

    if (birthDate !== undefined) {
      const dt = new Date(birthDate);
      if (isNaN(dt.getTime()) || dt >= new Date()) {
        throw new ValidationError("Birth date must be a valid past date");
      }
    }

    if (nationality !== undefined) {
      const nat = nationality.trim();
      if (nat.length < 2) {
        throw new ValidationError("Nationality must be at least 2 characters");
      }
    }
  }
}
