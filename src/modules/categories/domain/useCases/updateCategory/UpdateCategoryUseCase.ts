import { IUpdateCategoryDTO } from '../../dtos/IUpdateCategoryDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category as DomainCategory } from '../../entities/Category';
import { UpdateCategoryValidator } from '../../validators/UpdateCategoryValidator';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) { }

  public async execute(id: string, data: IUpdateCategoryDTO): Promise<DomainCategory | null> {
    UpdateCategoryValidator.validate(data);
    return await this.categoryRepository.updateCategory(id, data);
  }
}