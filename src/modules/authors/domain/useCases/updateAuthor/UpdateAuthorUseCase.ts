import { IUpdateAuthorDTO } from '../../dtos/IUpdateAuthorDTO';
import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';
import { AuthorUpdateValidator } from '../../validators/AuthorUpdateValidator';

export class UpdateAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  public async execute(id: string, data: IUpdateAuthorDTO): Promise<DomainAuthor | null> {
    AuthorUpdateValidator.validate(data);
    return await this.authorRepository.updateAuthor(id, data);
  }

}