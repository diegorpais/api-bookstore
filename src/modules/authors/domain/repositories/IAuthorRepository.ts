import { ICreateAuthorDTO } from '../dtos/ICreateAuthorDTO';
import { Author as DomainAuthor } from '../entities/Author';

export interface IAuthorRepository {
  create(data: ICreateAuthorDTO): Promise<DomainAuthor>;
  findAll(): Promise<DomainAuthor[]>;
  findById(id: string): Promise<DomainAuthor | null>;
}