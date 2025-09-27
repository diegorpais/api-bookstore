import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { IBookRepository } from '../../repositories/IBookRepository';
import { Book as DomainBook } from '../../entities/Book';
import { PaginationValidator } from '../../../../../shared/http/validators/PaginationValidator';

export class ListAllBooksPaginatedUseCase {
  constructor(private bookRepository: IBookRepository) { }

  public async execute(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainBook>> {
    PaginationValidator.validate(params);
    return await this.bookRepository.listAllBooksPaginated(params);
  }
}