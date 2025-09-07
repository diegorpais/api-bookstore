import { ICreateAuthorDTO } from '../../dtos/ICreateAuthorDTO';
import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';

export class CreateAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  async execute(data: ICreateAuthorDTO): Promise<DomainAuthor> {
    this.validateInput(data);

    return this.authorRepository.create(data);
  }

  private validateInput(data: ICreateAuthorDTO): void {
    if (!data.name?.trim()) {
      throw new Error('Name is required and cannot be empty');
    }

    if (data.name.trim().length < 2) {
      throw new Error('Name must have at least 2 characters');
    }

    if (!data.nationality?.trim()) {
      throw new Error('Nationality is required and cannot be empty');
    }

    if (!data.birthDate) {
      throw new Error('Birth date is required');
    }

    if (new Date(data.birthDate) > new Date()) {
      throw new Error('Birth date cannot be in the future');
    }

    if (data.biography && data.biography.trim().length < 10) {
      throw new Error('Biography must have at least 10 characters');
    }
  }

}