import { BookRepository } from '../../../infra/typeorm/repositories/BookRepository';
import { ListAllBooksPaginatedController } from './ListAllBooksPaginatedController';
import { ListAllBooksPaginatedUseCase } from './ListAllBooksPaginatedUseCase';

const bookRepository = new BookRepository();
const listAllBooksPaginatedUseCase = new ListAllBooksPaginatedUseCase(bookRepository);
const listAllBooksPaginatedController = new ListAllBooksPaginatedController(listAllBooksPaginatedUseCase);

export { listAllBooksPaginatedController };