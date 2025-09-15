import { IUpdatePublisherDTO } from '../../dtos/IUpdatePublisherDTO';
import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { Publisher as DomainPublisher } from '../../entities/Publisher';
import { UpdatePublisherValidator } from '../../validators/UpdatePublisherVallidator';

export class UpdatePublisherUseCase {
  constructor(private publisherRepository: IPublisherRepository) { }

  public async execute(id: string, data: IUpdatePublisherDTO): Promise<Promise<DomainPublisher | null>> {
    UpdatePublisherValidator.validate(data);
    
    return await this.publisherRepository.updatePublisher(id, data);
  }
}
