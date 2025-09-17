import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category as DomainCategory } from '../entities/Category';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<DomainCategory>;
}