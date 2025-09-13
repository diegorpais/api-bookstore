import { ICreatePublisherDTO } from '../dtos/ICreatePublisherDTO';
import { Publisher as DomainPublisher } from '../entities/Publisher';

export interface IPublisherRepository {
  create(data: ICreatePublisherDTO): Promise<DomainPublisher>;
}