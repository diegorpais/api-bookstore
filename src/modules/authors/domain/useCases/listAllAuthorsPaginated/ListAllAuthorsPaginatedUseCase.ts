import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Author as DomainAuthor } from '../../entities/Author';
import { AuthorListAllPaginatedValidator } from '../../validators/AuthorListAllPaginatedValidator';

export class ListAllAuthorsPaginatedUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  public async execute(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainAuthor>> {
    AuthorListAllPaginatedValidator.validate(params);

    return await this.authorRepository.findAllPaginated(params);
  }
}