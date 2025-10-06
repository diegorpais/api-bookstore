import { AuthorRepository } from '../../../../authors/infra/typeorm/repositories/AuthorRepository';
import { CategoryRepository } from '../../../../categories/infra/typeorm/repositories/CategoryRepository';
import { BookAuthorRepository } from '../../../infra/typeorm/repositories/BookAuthorRepository';
import { BookCategoryRepository } from '../../../infra/typeorm/repositories/BookCategoryRepository';
import { BookRepository } from '../../../infra/typeorm/repositories/BookRepository';
import { CreateBookController } from './CreateBookController';
import { CreateBookUseCase } from './CreateBookUseCase';

const bookAuthorRepository = new BookAuthorRepository();
const bookCategoryRepository = new BookCategoryRepository();

const authorRepository = new AuthorRepository();
const categoryRepository = new CategoryRepository();

const bookRepository = new BookRepository(bookAuthorRepository, bookCategoryRepository);

const createBookUseCase = new CreateBookUseCase(bookRepository, authorRepository, categoryRepository);
const createBookController = new CreateBookController(createBookUseCase);

export { createBookController }
