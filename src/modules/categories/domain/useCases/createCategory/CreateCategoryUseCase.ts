import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category as DomainCategory } from '../../entities/Category';
import { CreateCategoryValidator } from '../../validators/CreateCategoryValidator';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: ICreateCategoryDTO): Promise<DomainCategory> {
    CreateCategoryValidator.validate(data);
    return await this.categoryRepository.create(data);
  }
}