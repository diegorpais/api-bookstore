import { ValidationError } from '../../../../shared/http/errors/ValidationError';
import { IUpdatePublisherDTO } from '../dtos/IUpdatePublisherDTO';

export class UpdatePublisherValidator {
  static validate(patch: IUpdatePublisherDTO): void {
    const { name, address, phone, website } = patch;

    if (
      name === undefined &&
      address === undefined &&
      phone === undefined &&
      website === undefined
    ) {
      throw new ValidationError("At least one field must be provided", 400);
    }

    if (name !== undefined) {
      const n = name.trim();
      if (n.length < 2 || n.length > 255) {
        throw new ValidationError("Name must be between 2 and 255 characters");
      }
    }

    if (address !== undefined) {
      if (address.length > 500) {
        throw new ValidationError("Address must be at most 500 characters");
      }
    }

    if (phone !== undefined) {
      const p = phone.trim();
      if (!/^\d{7,15}$/.test(p)) {
        throw new ValidationError("Phone must be a valid number with 7 to 15 digits");
      }
    }

    if (website !== undefined) {
      const w = website.trim();
      if (!/^https?:\/\//.test(w)) {
        throw new ValidationError("Website must be a valid URL");
      }
    }
  }
}
