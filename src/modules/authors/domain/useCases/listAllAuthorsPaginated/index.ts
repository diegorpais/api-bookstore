import { AuthorRepository } from '../../../infra/typeorm/repositories/AuthorRepository';
import { ListAllAuthorsPaginatedController } from './ListAllAuthorsPaginatedController';
import { ListAllAuthorsPaginatedUseCase } from './ListAllAuthorsPaginatedUseCase';


const authorRepository = new AuthorRepository();
const listAllAuthorsPaginatedUseCase = new ListAllAuthorsPaginatedUseCase(authorRepository);
const listAllAuthorsPaginatedController = new ListAllAuthorsPaginatedController(listAllAuthorsPaginatedUseCase);

export { listAllAuthorsPaginatedController };