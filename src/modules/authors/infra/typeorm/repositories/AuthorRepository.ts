import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../../../../data-source';
import { IAuthorRepository } from '../../../domain/repositories/IAuthorRepository';
import { ICreateAuthorDTO } from '../../../domain/dtos/ICreateAuthorDTO';
import { Author as DomainAuthor } from '../../../domain/entities/Author';
import { Author as InfraAuthor } from '../entities/Author';

export class AuthorRepository implements IAuthorRepository {
  private ormRepository: Repository<InfraAuthor>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraAuthor);
  }

  private convertInfraToDomain(infraAuthor: InfraAuthor): DomainAuthor {
    return Object.assign(new DomainAuthor(), infraAuthor);
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

}