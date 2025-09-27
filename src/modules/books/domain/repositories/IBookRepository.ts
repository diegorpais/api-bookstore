import { PaginatedResultDTO } from '../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { Book as DomainBook } from '../entities/Book';

export interface IBookRepository {
  createBook(data: ICreateBookDTO): Promise<DomainBook>;
  listAllBooksPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainBook>>;
}