import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { IBookRepository } from '../../../domain/repositories/IBookRepository';
import { AppDataSource } from '../../../../../data-source';
import { Book as InfraBook } from '../entities/Book';
import { Book as DomainBook } from '../../../domain/entities/Book';
import { ICreateBookDTO } from '../../../domain/dtos/ICreateBookDTO';
import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { IBookAuthorRepository } from '../../../domain/repositories/IBookAuthorRepository';

export class BookRepository implements IBookRepository {
  private ormRepository: Repository<InfraBook>;
  private bookAuthorRepository: IBookAuthorRepository;

  constructor(
    bookAuthorRepository: IBookAuthorRepository
  ) {
    this.ormRepository = AppDataSource.getRepository(InfraBook);
    this.bookAuthorRepository = bookAuthorRepository;
  }

  private convertInfraToDomain(infraBook: InfraBook): DomainBook {
    return Object.assign(new DomainBook(), infraBook);
  }

  private async createBookAuthorRelations(bookId: string, authorIds: string[]): Promise<void> {
    for (const authorId of authorIds) {
      await this.bookAuthorRepository.createBookAuthor({ bookId, authorId });
    }
  }

  public async createBook(data: ICreateBookDTO): Promise<DomainBook> {
    const id = uuidV4();
    const bookWithId = { ...data, id };

    const bookEntity = this.ormRepository.create(bookWithId);
    const savedBook = await this.ormRepository.save(bookEntity);

    await this.createBookAuthorRelations(savedBook.id, data.authorIds);

    return this.convertInfraToDomain(savedBook);
  }

  public async listAllBooksPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainBook>> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = params;
    const skip = (page - 1) * limit;

    const [books, totalItems] = await this.ormRepository.findAndCount({
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder
      }
    });

    const domainBooks = books.map(book => this.convertInfraToDomain(book));
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: domainBooks,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    };
  }
}