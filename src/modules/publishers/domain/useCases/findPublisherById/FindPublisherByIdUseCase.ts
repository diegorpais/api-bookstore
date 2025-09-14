import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { Publisher as DomainPublisher } from '../../entities/Publisher';

export class FindPublisherByIdUseCase {
  constructor(private publisherRepository: IPublisherRepository) { }

  public async execute(id: string): Promise<DomainPublisher | null> {
    return await this.publisherRepository.findPublisherById(id);
  }
}
