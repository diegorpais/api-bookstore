import { CategoryRepository } from '../../../infra/typeorm/repositories/CategoryRepository';
import { ListAllCategoriesUseCase } from './ListAllCategoriesUseCase';
import { ListAllCategoriesController } from './ListAllCatgoriesController';

const categoryRepository = new CategoryRepository();
const listAllCategoriesUseCase = new ListAllCategoriesUseCase(categoryRepository);
const listAllCategoriesController = new ListAllCategoriesController(listAllCategoriesUseCase);

export { listAllCategoriesController }