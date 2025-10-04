import { ICreateBookAuthorDTO } from '../dtos/ICreateBookAuthorDTO';
import { BookAuthor as DomainBookAuthor } from '../entities/BookAuthor';

export interface IBookAuthorRepository {
  createBookAuthor(data: ICreateBookAuthorDTO): Promise<DomainBookAuthor>;
}