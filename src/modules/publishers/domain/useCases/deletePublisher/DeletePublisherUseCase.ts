import { ValidationError } from '../../../../../shared/http/errors/ValidationError';
import { IPublisherRepository } from '../../repositories/IPublisherRepository';

export class DeletePublisherUseCase {
  constructor(private publisherRepository: IPublisherRepository) { }

  async execute(id: string): Promise<void> {
    const publisher = await this.publisherRepository.findPublisherById(id);
    
    if (!publisher) throw new ValidationError(`Publisher with id ${id} not found`);

    await this.publisherRepository.deletePublisher(id);
  }

}
