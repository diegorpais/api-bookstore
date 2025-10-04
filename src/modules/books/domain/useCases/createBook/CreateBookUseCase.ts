import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IBookRepository } from '../../repositories/IBookRepository';
import { Book as DomainBook } from '../../entities/Book';
import { CreateBookValidator } from '../../validators/CreateBookValidator';
import { IAuthorRepository } from '../../../../authors/domain/repositories/IAuthorRepository';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class CreateBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private authorRepository: IAuthorRepository
  ) { }

  private validateAuthorsExistence = async (authorIds: string[]): Promise<void> => {
    const authors = await this.authorRepository.findByIds(authorIds);
    if (!authors || authors.length !== authorIds.length) {
      throw new ValidationError("One or more authors do not exist.");
    }
  }

  async execute(data: ICreateBookDTO): Promise<DomainBook> {
    CreateBookValidator.validate(data);

    await this.validateAuthorsExistence(data.authorIds);

    return await this.bookRepository.createBook(data);
  }
}