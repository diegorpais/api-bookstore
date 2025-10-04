import { AuthorRepository } from '../../../../authors/infra/typeorm/repositories/AuthorRepository';
import { BookAuthorRepository } from '../../../infra/typeorm/repositories/BookAuthorRepository';
import { BookRepository } from '../../../infra/typeorm/repositories/BookRepository';
import { CreateBookController } from './CreateBookController';
import { CreateBookUseCase } from './CreateBookUseCase';

const bookAuthorRepository = new BookAuthorRepository();
const authorRepository = new AuthorRepository();

const bookRepository = new BookRepository(bookAuthorRepository);

const createBookUseCase = new CreateBookUseCase(bookRepository, authorRepository);
const createBookController = new CreateBookController(createBookUseCase);

export { createBookController }
