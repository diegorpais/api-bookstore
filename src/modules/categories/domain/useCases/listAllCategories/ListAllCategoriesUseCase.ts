import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category as DomainCategory } from '../../entities/Category';

export class ListAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  public async execute(): Promise<DomainCategory[]> {
    return await this.categoryRepository.listAllCategories();
  }
}