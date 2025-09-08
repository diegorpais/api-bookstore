import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { ListAllAuthorsController } from './ListAllAuthorsController';
import { ListAllAuthorsUseCase } from './ListAllAuthorsUseCase';

const authorRepository = new AuthorRepository();
const listAllAuthorsUseCase = new ListAllAuthorsUseCase(authorRepository);
const listAllAuthorsController = new ListAllAuthorsController(listAllAuthorsUseCase);

export { listAllAuthorsController };