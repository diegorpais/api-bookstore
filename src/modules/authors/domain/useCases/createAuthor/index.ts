import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { CreateAuthorController } from './CreateAuthorController';
import { CreateAuthorUseCase } from './CreateAuthorUseCase';

const authorRepository = new AuthorRepository();
const createAuthorUseCase = new CreateAuthorUseCase(authorRepository);
const createAuthorController = new CreateAuthorController(createAuthorUseCase);

export { createAuthorController };
