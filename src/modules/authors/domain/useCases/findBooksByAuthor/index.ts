import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { FindBooksByAuthorController } from './FindBooksByAuthorController';
import { FindBooksByAuthorUseCase } from './FindBooksByAuthorUseCase';

const authorRepository = new AuthorRepository();
const findBooksByAuthorUseCase = new FindBooksByAuthorUseCase(authorRepository);
const findBooksByAuthorController = new FindBooksByAuthorController(findBooksByAuthorUseCase);

export { findBooksByAuthorController };