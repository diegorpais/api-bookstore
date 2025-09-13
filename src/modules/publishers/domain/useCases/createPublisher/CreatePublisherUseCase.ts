import { ICreatePublisherDTO } from '../../dtos/ICreatePublisherDTO';
import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { Publisher as DomainPublisher } from '../../entities/Publisher';
import { CreatePublisherValidator } from '../../validators/CreatePublisherVallidator';

export class CreatePublisherUseCase {

  constructor(private publisherRepository: IPublisherRepository) { }

  async execute(data: ICreatePublisherDTO): Promise<DomainPublisher> {
    CreatePublisherValidator.validate(data);
    return await this.publisherRepository.create(data);
  }
}