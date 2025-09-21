import { PaginatedResultDTO } from '../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category as DomainCategory } from '../entities/Category';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<DomainCategory>;
  listAllCategories(): Promise<DomainCategory[]>;
  listAllCategoriesPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainCategory>>;
}
