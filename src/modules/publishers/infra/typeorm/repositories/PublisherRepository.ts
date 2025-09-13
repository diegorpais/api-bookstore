import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../../../../data-source';
import { IPublisherRepository } from '../../../domain/repositories/IPublisherRepository';
import { ICreatePublisherDTO } from '../../../domain/dtos/ICreatePublisherDTO';
import { Publisher as InfraPublisher } from '../entities/Publisher';
import { Publisher as DomainPublisher } from '../../../domain/entities/Publisher';

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

}