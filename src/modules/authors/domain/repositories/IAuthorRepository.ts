import { ICreateAuthorDTO } from '../dtos/ICreateAuthorDTO';
import { Author } from '../entities/Author';

export interface IAuthorRepository {
  create(data: ICreateAuthorDTO): Promise<Author>;
}