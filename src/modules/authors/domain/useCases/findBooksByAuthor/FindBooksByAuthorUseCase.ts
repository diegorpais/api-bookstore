import { IAuthorRepository } from '../../repositories/IAuthorRepository';
import { Book as DomainBook } from '../../../../books/domain/entities/Book';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class FindBooksByAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  async execute(authorId: string): Promise<DomainBook[] | null> {
    // verificar se o authorId é válido
    const books = await this.authorRepository.findBooksByAuthorId(authorId);

    if (!books) { throw new ValidationError('No books found for the given author ID'); }

    return books;
  }
}
