import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { UpdateAuthorController } from './UpdateAuthorController';
import { UpdateAuthorUseCase } from './UpdateAuthorUseCase';

const authorRepository = new AuthorRepository();
const updateAuthorUseCase = new UpdateAuthorUseCase(authorRepository);
const updateAuthorController = new UpdateAuthorController(updateAuthorUseCase);

export { updateAuthorController };