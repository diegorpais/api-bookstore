import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";

export class AuthorValidator {
  static validate(data: ICreateAuthorDTO): void {
    const { name, biography, birthDate, nationality } = data;

    // name obrigatório, entre 2 e 255 caracteres
    if (!name || name.trim().length < 2 || name.length > 255) {
      throw new ValidationError("Name must be between 2 and 255 characters");
    }

    // biography opcional, mas max 2000 caracteres
    if (biography && biography.length > 2000) {
      throw new ValidationError("Biography must be at most 2000 characters");
    }

    // birthDate obrigatório, precisa ser data válida no passado
    const date = new Date(birthDate);
    if (!birthDate || isNaN(date.getTime()) || date >= new Date()) {
      throw new ValidationError("Birth date must be a valid past date");
    }

    // nationality obrigatória, mínimo 2 caracteres
    if (!nationality || nationality.trim().length < 2) {
      throw new ValidationError("Nationality must be at least 2 characters");
    }
  }
}
