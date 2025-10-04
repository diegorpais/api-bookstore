import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { validate as uuidValidate } from 'uuid';

export class CreateBookValidator {
  static validate(data: ICreateBookDTO): void {
    const { title, isbn, publicationYear, pages, synopsis, language, publisherId, authorIds } = data;

    // title obrigatório, entre 1 e 255 caracteres
    if (!title || title.trim().length < 1 || title.length > 255) {
      throw new ValidationError("Title must be between 1 and 255 characters");
    }

    // ISBN obrigatório, formato válido
    if (!isbn || !/^(97(8|9))?\d{9}(\d|X)$/.test(isbn)) {
      throw new ValidationError("Invalid ISBN format");
    }

    // Ano de publicação obrigatório, deve ser um número entre 1000 e o ano atual
    const currentYear = new Date().getFullYear();
    if (!publicationYear || typeof publicationYear !== "number" || publicationYear < 1000 || publicationYear > currentYear) {
      throw new ValidationError("Publication year must be a valid number between 1000 and the current year");
    }

    // Páginas obrigatório, deve ser um número, no minimo 1
    if (!pages || typeof pages !== "number" || pages < 1) {
      throw new ValidationError("Pages must be a valid number");
    }

    // Sinopse obrigatória, entre 10 e 1000 caracteres
    if (!synopsis || synopsis.trim().length < 10 || synopsis.length > 1000) {
      throw new ValidationError("Synopsis must be between 1 and 1000 characters");
    }

    // Idioma obrigatório, entre 1 e 100 caracteres
    if (!language || language.trim().length < 1 || language.length > 100) {
      throw new ValidationError("Language must be between 1 and 100 characters");
    }

    // Publisher ID obrigatório
    if (!publisherId || publisherId.trim().length < 1) {
      throw new ValidationError("Publisher ID is required");
    }

    // Author IDs obrigatório, deve ser um array com pelo menos um ID, os dados não podem estar vazios
    if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0 || authorIds.some(id => !id || id.trim().length < 1 || !uuidValidate(id))) {
      throw new ValidationError("At least one valid Author ID is required");
    }
  }
}
