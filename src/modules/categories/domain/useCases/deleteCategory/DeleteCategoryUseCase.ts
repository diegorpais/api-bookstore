import { ValidationError } from '../../../../../shared/http/errors/ValidationError';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  public async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(id);
    if (!category) throw new ValidationError(`Category with id ${id} not found`);

    await this.categoryRepository.deleteCategory(id);
  }
}