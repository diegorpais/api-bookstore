import { Repository } from 'typeorm';
import { IBookCategoryRepository } from '../../../domain/repositories/IBookCategoryRepository';
import { BookCategory as InfraBookCategory } from '../entities/BookCategory';
import { AppDataSource } from '../../../../../data-source';
import { BookCategory as DomainBookCategory } from '../../../domain/entities/BookCategory';
import { ICreateBookCategoryDTO } from '../../../domain/dtos/ICreateBookCategoryDTO';

export class BookCategoryRepository implements IBookCategoryRepository {
  private ormRepository: Repository<InfraBookCategory>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraBookCategory);
  }

  private convertInfraToDomain(infraBook: InfraBookCategory): DomainBookCategory {
    return Object.assign(new DomainBookCategory(), infraBook);
  }

  public async createBookCategory(data: ICreateBookCategoryDTO): Promise<DomainBookCategory> {
    const bookAuthorEntity = this.ormRepository.create(data);
    const savedBookAuthor = await this.ormRepository.save(bookAuthorEntity);
    return this.convertInfraToDomain(savedBookAuthor);
  }
}