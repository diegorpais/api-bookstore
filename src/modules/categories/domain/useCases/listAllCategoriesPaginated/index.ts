import { CategoryRepository } from '../../../infra/typeorm/repositories/CategoryRepository';
import { ListAllCategoriesPaginatedController } from './ListAllCategoriesPaginatedController';
import { ListAllCategoriesPaginatedUseCase } from './ListAllCategoriesPaginatedUseCase';

const categoryRepository = new CategoryRepository();
const listAllCategoriesPaginatedUseCase = new ListAllCategoriesPaginatedUseCase(categoryRepository);
const listAllCategoriesPaginatedController = new ListAllCategoriesPaginatedController(listAllCategoriesPaginatedUseCase);

export { listAllCategoriesPaginatedController }