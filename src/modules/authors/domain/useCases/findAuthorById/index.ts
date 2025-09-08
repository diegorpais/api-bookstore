import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { FindAuthorByIdController } from './FindAuthorByIdController';
import { FindAuthorByIdUseCase } from './FindAuthorByIdUseCase';

const authorRepository = new AuthorRepository();
const findAuthorByIdUseCase = new FindAuthorByIdUseCase(authorRepository);
const findAuthorByIdController = new FindAuthorByIdController(findAuthorByIdUseCase);

export { findAuthorByIdController };
