import { PublisherRepository } from '../../../infra/typeorm/repositories/PublisherRepository';
import { DeletePublisherController } from './DeletePublisherController';
import { DeletePublisherUseCase } from './DeletePublisherUseCase';

const publisherRepository = new PublisherRepository();
const deletePublisherUseCase = new DeletePublisherUseCase(publisherRepository);
const deletePublisherController = new DeletePublisherController(deletePublisherUseCase);

export { deletePublisherController }
