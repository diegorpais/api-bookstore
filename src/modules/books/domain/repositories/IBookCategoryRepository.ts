import { ICreateBookCategoryDTO } from '../dtos/ICreateBookCategoryDTO';
import { BookCategory as DomainBookCategory } from '../entities/BookCategory';

export interface IBookCategoryRepository {
  createBookCategory(data: ICreateBookCategoryDTO): Promise<DomainBookCategory>;
}