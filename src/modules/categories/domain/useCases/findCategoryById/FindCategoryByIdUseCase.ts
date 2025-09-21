import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category as DomainCategory } from '../../entities/Category';

export class FindCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  public async execute(id: string): Promise<DomainCategory | null> {
    const category = await this.categoryRepository.findCategoryById(id);
    return category;
  }
}