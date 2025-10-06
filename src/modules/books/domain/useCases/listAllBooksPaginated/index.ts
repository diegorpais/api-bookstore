import { BookAuthorRepository } from '../../../infra/typeorm/repositories/BookAuthorRepository';
import { BookCategoryRepository } from '../../../infra/typeorm/repositories/BookCategoryRepository';
import { BookRepository } from '../../../infra/typeorm/repositories/BookRepository';
import { ListAllBooksPaginatedController } from './ListAllBooksPaginatedController';
import { ListAllBooksPaginatedUseCase } from './ListAllBooksPaginatedUseCase';

const bookAuthorRepository = new BookAuthorRepository();
const bookCategoryRepository = new BookCategoryRepository();

const bookRepository = new BookRepository(bookAuthorRepository, bookCategoryRepository);
const listAllBooksPaginatedUseCase = new ListAllBooksPaginatedUseCase(bookRepository);
const listAllBooksPaginatedController = new ListAllBooksPaginatedController(listAllBooksPaginatedUseCase);

export { listAllBooksPaginatedController };