import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';

export class FindAuthorByIdUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  public async execute(id: string): Promise<DomainAuthor | null> {
    return await this.authorRepository.findById(id);
  }

}