import { PaginatedResultDTO } from '../../../../shared/domain/dtos/PaginatedResultDTO';
import { PaginationParamsDTO } from '../../../../shared/domain/dtos/PaginationParamsDTO';
import { ICreatePublisherDTO } from '../dtos/ICreatePublisherDTO';
import { Publisher as DomainPublisher } from '../entities/Publisher';

export interface IPublisherRepository {
  create(data: ICreatePublisherDTO): Promise<DomainPublisher>;
  listAll(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainPublisher>>;
  findPublisherById(id: string): Promise<DomainPublisher | null>;
}