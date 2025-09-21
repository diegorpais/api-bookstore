import { PaginatedResultDTO } from '../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO';
import { Category as DomainCategory } from '../entities/Category';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<DomainCategory>;
  listAllCategories(): Promise<DomainCategory[]>;
  listAllCategoriesPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainCategory>>;
  findCategoryById(id: string): Promise<DomainCategory | null>;
  deleteCategory(id: string): Promise<void>;
  updateCategory(id: string, data: IUpdateCategoryDTO): Promise<DomainCategory | null>;
}
