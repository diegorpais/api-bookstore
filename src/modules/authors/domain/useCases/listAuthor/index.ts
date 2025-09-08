import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { ListAllAuthorsController } from './ListAuthorController';
import { ListAuthorUseCase } from './ListAuthorUseCase';


const authorRepository = new AuthorRepository();
const listAuthorUseCase = new ListAuthorUseCase(authorRepository);
const listAuthorController = new ListAllAuthorsController(listAuthorUseCase);

export { listAuthorController };
