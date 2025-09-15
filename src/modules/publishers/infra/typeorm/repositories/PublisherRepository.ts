import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../../../../data-source';
import { IPublisherRepository } from '../../../domain/repositories/IPublisherRepository';
import { ICreatePublisherDTO } from '../../../domain/dtos/ICreatePublisherDTO';
import { IUpdatePublisherDTO } from '../../../domain/dtos/IUpdatePublisherDTO';
import { Publisher as InfraPublisher } from '../entities/Publisher';
import { Publisher as DomainPublisher } from '../../../domain/entities/Publisher';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';

export class PublisherRepository implements IPublisherRepository {
  private ormRepository: Repository<InfraPublisher>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraPublisher);
  }

  private convertInfraToDomain(infraPublisher: InfraPublisher): DomainPublisher {
    return Object.assign(new DomainPublisher(), infraPublisher);
  }

  public async create(data: ICreatePublisherDTO): Promise<DomainPublisher> {
    const id = uuidV4();
    const publisherWithId = { ...data, id };

    const publisherEntity = this.ormRepository.create(publisherWithId);
    const savedPublisher = await this.ormRepository.save(publisherEntity);

    return this.convertInfraToDomain(savedPublisher);
  }

  public async listAll(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainPublisher>> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = params;
    const skip = (page - 1) * limit;

    const [publishers, totalItems] = await this.ormRepository.findAndCount({
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder
      }
    });

    const domainPublishers = publishers.map(publisher => this.convertInfraToDomain(publisher));
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: domainPublishers,
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

  public async findPublisherById(id: string): Promise<DomainPublisher | null> {
    const publisher = await this.ormRepository.findOneBy({ id });
    return publisher ? this.convertInfraToDomain(publisher) : null;
  }

  public async updatePublisher(id: string, data: IUpdatePublisherDTO): Promise<DomainPublisher | null> {
    const preload = await this.ormRepository.preload({ id, ...data });
    if (!preload) return null;

    const saved = await this.ormRepository.save(preload);
    return this.convertInfraToDomain(saved);
  }

}
