import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { Publisher as DomainPublisher } from '../../../domain/entities/Publisher';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationValidator } from '../../../../../shared/http/validators/PaginationValidator';

export class ListAllPublishersUseCase {
  constructor(private publisherRepository: IPublisherRepository) { }

  public async execute(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainPublisher>> {
    PaginationValidator.validate(params);

    return await this.publisherRepository.listAll(params);
  }
}