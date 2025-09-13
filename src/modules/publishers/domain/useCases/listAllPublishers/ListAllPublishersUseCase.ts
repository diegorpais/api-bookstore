import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { Publisher as DomainPublisher } from '../../../domain/entities/Publisher';

export class ListAllPublishersUseCase {
  constructor(private publisherRepository: IPublisherRepository) { }

  public async execute(): Promise<DomainPublisher[]> {
    const publishers = await this.publisherRepository.listAll();
    return publishers;
  }
}