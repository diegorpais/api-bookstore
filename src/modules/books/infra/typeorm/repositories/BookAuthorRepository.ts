import { Repository } from 'typeorm';
import { IBookAuthorRepository } from '../../../domain/repositories/IBookAuthorRepository';
import { AppDataSource } from '../../../../../data-source';
import { BookAuthor as InfraBookAuthor } from '../entities/BookAuthor';
import { BookAuthor as DomainBookAuthor } from '../../../domain/entities/BookAuthor';
import { ICreateBookAuthorDTO } from '../../../domain/dtos/ICreateBookAuthorDTO';

export class BookAuthorRepository implements IBookAuthorRepository {
  private ormRepository: Repository<InfraBookAuthor>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraBookAuthor);
  }

  private convertInfraToDomain(infraBook: InfraBookAuthor): DomainBookAuthor {
    return Object.assign(new DomainBookAuthor(), infraBook);
  }

  public async createBookAuthor(data: ICreateBookAuthorDTO): Promise<DomainBookAuthor> {
    const bookAuthorEntity = this.ormRepository.create(data);
    const savedBookAuthor = await this.ormRepository.save(bookAuthorEntity);
    return this.convertInfraToDomain(savedBookAuthor);
  }
}