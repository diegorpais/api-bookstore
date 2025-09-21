import { CategoryRepository } from '../../../infra/typeorm/repositories/CategoryRepository';
import { FindCategoryByIdController } from './FindCategoryByIdController';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

const categoryRepository = new CategoryRepository();

const findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoryRepository);
const findCategoryByIdController = new FindCategoryByIdController(findCategoryByIdUseCase);

export { findCategoryByIdController }
