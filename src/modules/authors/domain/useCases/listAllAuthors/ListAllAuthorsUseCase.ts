import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';

export class ListAllAuthorsUseCase {
  constructor(private authorRepository: IAuthorRepository) {}

  public async execute(): Promise<DomainAuthor[]> {
    return await this.authorRepository.findAll();
  }
}