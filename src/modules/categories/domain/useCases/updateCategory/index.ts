import { CategoryRepository } from '../../../infra/typeorm/repositories/CategoryRepository';
import { UpdateCategoryController } from './UpdateCategoryController';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

const categoryRepository = new CategoryRepository();
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase);

export { updateCategoryController }