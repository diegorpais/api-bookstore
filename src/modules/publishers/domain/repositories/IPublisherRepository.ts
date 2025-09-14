import { ICreatePublisherDTO } from '../dtos/ICreatePublisherDTO';
import { Publisher as DomainPublisher } from '../entities/Publisher';

export interface IPublisherRepository {
  create(data: ICreatePublisherDTO): Promise<DomainPublisher>;
  listAll(): Promise<DomainPublisher[]>;
  findPublisherById(id: string): Promise<DomainPublisher | null>;
}
