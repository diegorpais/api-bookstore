import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category as DomainCategory } from '../../entities/Category';
import { PaginationValidator } from '../../../../../shared/http/validators/PaginationValidator';

export class ListAllCategoriesPaginatedUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  public async execute(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainCategory>> {
    PaginationValidator.validate(params);
    return await this.categoryRepository.listAllCategoriesPaginated(params);
  }
}