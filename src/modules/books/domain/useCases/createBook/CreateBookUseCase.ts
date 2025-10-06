import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IBookRepository } from '../../repositories/IBookRepository';
import { Book as DomainBook } from '../../entities/Book';
import { CreateBookValidator } from '../../validators/CreateBookValidator';
import { IAuthorRepository } from '../../../../authors/domain/repositories/IAuthorRepository';
import { ICategoryRepository } from '../../../../categories/domain/repositories/ICategoryRepository';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class CreateBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private authorRepository: IAuthorRepository,
    private categoryRepository: ICategoryRepository
  ) { }

  private validateAuthorsExistence = async (authorIds: string[]): Promise<void> => {
    const authors = await this.authorRepository.findByIds(authorIds);
    if (!authors || authors.length !== authorIds.length) {
      throw new ValidationError("One or more authors do not exist.");
    }
  }

  private validateCategoriesExistence = async (categoryIds: string[]): Promise<void> => {
    const categories = await this.categoryRepository.findByIds(categoryIds);
    if (!categories || categories.length !== categoryIds.length) {
      throw new ValidationError("One or more categories do not exist.");
    }
  }

  async execute(data: ICreateBookDTO): Promise<DomainBook> {
    CreateBookValidator.validate(data);

    await this.validateAuthorsExistence(data.authorIds);
    await this.validateCategoriesExistence(data.categoryIds);

    return await this.bookRepository.createBook(data);
  }
}