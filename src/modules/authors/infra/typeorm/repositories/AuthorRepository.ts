import { In, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../../../../data-source';
import { IAuthorRepository } from '../../../domain/repositories/IAuthorRepository';
import { ICreateAuthorDTO } from '../../../domain/dtos/ICreateAuthorDTO';
import { IUpdateAuthorDTO } from '../../../domain/dtos/IUpdateAuthorDTO';

import { Author as DomainAuthor } from '../../../domain/entities/Author';
import { Book as DomainBook } from '../../../../books/domain/entities/Book';

import { Author as InfraAuthor } from '../entities/Author';
import { BookAuthor as InfraBookAuthor } from '../../../../books/infra/typeorm/entities/BookAuthor';
import { Book as InfraBook } from '../../../../books/infra/typeorm/entities/Book';

import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';

export class AuthorRepository implements IAuthorRepository {
  private ormRepository: Repository<InfraAuthor>;
  private booksRepository: Repository<InfraBook>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraAuthor);
    this.booksRepository = AppDataSource.getRepository(InfraBook);
  }

  private convertInfraToDomain(infraAuthor: InfraAuthor): DomainAuthor {
    return Object.assign(new DomainAuthor(), infraAuthor);
  }

  private convertInfraBooksToDomain(infraBooks: InfraBook[]): DomainBook[] {
    return infraBooks.map(infraBook => Object.assign(new DomainBook(), infraBook));
  }

  public async create(data: ICreateAuthorDTO): Promise<DomainAuthor> {
    const id = uuidV4();
    const authorWithId = { ...data, id };

    const authorEntity = this.ormRepository.create(authorWithId);
    const savedAuthor = await this.ormRepository.save(authorEntity);

    return this.convertInfraToDomain(savedAuthor);
  }

  public async findAll(): Promise<DomainAuthor[]> {
    const authors = await this.ormRepository.find();
    return authors.map(author => this.convertInfraToDomain(author));
  }

  public async findById(id: string): Promise<DomainAuthor | null> {
    const author = await this.ormRepository.findOneBy({ id });
    return author ? this.convertInfraToDomain(author) : null;
  }

  public async updateAuthor(id: string, data: IUpdateAuthorDTO): Promise<DomainAuthor | null> {
    const preloaded = await this.ormRepository.preload({ id, ...data });
    if (!preloaded) return null; // 404 no use case/controller
    const saved = await this.ormRepository.save(preloaded);
    return this.convertInfraToDomain(saved);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainAuthor>> {
    const { page, limit, sortBy = 'id', sortOrder = 'ASC' } = params;

    // Calcular offset
    // Calcula quantos registros "pular" para chegar na página desejada. Por exemplo:
    // Página 1, limite 10: skip = 0 /// Página 2, limite 10: skip = 10
    const skip = (page - 1) * limit;

    // Buscar dados com paginação
    const [authors, totalItems] = await this.ormRepository.findAndCount({
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder
      }
    });

    // Converter para domínio
    const domainAuthors = authors.map(author => this.convertInfraToDomain(author));

    // Calcular metadados de paginação
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: domainAuthors,
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

  public async findByIds(ids: Array<string>): Promise<Array<DomainAuthor> | null> {
    const authors = await this.ormRepository.findBy({ id: In(ids) });
    return authors.length ? authors.map(author => this.convertInfraToDomain(author)) : null;
  }

  public async findBooksByAuthorId(authorId: string): Promise<DomainBook[] | null> {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .innerJoin(InfraBookAuthor, 'book_author', 'book_author.book_id = book.id')
      .where('book_author.author_id = :authorId', { authorId })
      .andWhere('book.deleted_at IS NULL')
      .getMany();

    return books.length ? this.convertInfraBooksToDomain(books) : null;
  }


}