import { ICreateAuthorDTO } from '../../dtos/ICreateAuthorDTO';
import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';
import { AuthorValidator } from '../../validators/AuthorValidator';

export class CreateAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  async execute(data: ICreateAuthorDTO): Promise<DomainAuthor> {
    AuthorValidator.validate(data);
    return this.authorRepository.create(data);
  }

}