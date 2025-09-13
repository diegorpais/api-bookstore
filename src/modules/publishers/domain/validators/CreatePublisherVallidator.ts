import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { ICreatePublisherDTO } from '../dtos/ICreatePublisherDTO';

export class CreatePublisherValidator {
  static validate(data: ICreatePublisherDTO): void {
    const { name, address, phone, website } = data;

    // name obrigatório, entre 2 e 255 caracteres
    if (!name || name.trim().length < 2 || name.length > 255) {
      throw new ValidationError("Name must be between 2 and 255 characters");
    }

    // address opcional, mas max 500 caracteres
    if (address && address.length > 500) {
      throw new ValidationError("Address must be at most 500 characters");
    }

    // phone opcional, mas deve ser um número válido (apenas dígitos, entre 7 e 15 caracteres)
    if (phone && !/^\d{7,15}$/.test(phone)) {
      throw new ValidationError("Phone must be a valid number with 7 to 15 digits");
    }

    // website opcional, mas deve ser uma URL válida
    if (website && !/^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.]*)*\/?$/.test(website)) {
      throw new ValidationError("Website must be a valid URL");
    }
  }
}