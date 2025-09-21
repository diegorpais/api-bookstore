import { CategoryRepository } from '../../../infra/typeorm/repositories/CategoryRepository';
import { DeleteCategoryController } from './DeleteCategoryController';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

const categoryRepository = new CategoryRepository();

const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
const deleteCategoryController = new DeleteCategoryController(deleteCategoryUseCase);

export { deleteCategoryController }
