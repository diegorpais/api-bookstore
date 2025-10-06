import { PaginatedResultDTO } from '../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICreateAuthorDTO } from '../dtos/ICreateAuthorDTO';
import { IUpdateAuthorDTO } from '../dtos/IUpdateAuthorDTO';
import { Author as DomainAuthor } from '../entities/Author';
import { Book as DomainBook } from '../../../books/domain/entities/Book';

export interface IAuthorRepository {
  create(data: ICreateAuthorDTO): Promise<DomainAuthor>;
  findAll(): Promise<DomainAuthor[]>;
  findById(id: string): Promise<DomainAuthor | null>;
  findByIds(ids: Array<string>): Promise<Array<DomainAuthor> | null>;
  updateAuthor(id: string, data: IUpdateAuthorDTO): Promise<DomainAuthor | null>;
  deleteAuthor(id: string): Promise<void>;
  findAllPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainAuthor>>;
  findBooksByAuthorId(authorId: string): Promise<DomainBook[] | null>;
}