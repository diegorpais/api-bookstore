import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { DeleteAuthorController } from './DeleteAuthorController';
import { DeleteAuthorUseCase } from './DeleteAuthorUseCase';

const authorRepository = new AuthorRepository();
const deleteAuthorUseCase = new DeleteAuthorUseCase(authorRepository);
const deleteAuthorController = new DeleteAuthorController(deleteAuthorUseCase);

export { deleteAuthorController };