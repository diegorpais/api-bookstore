import { PublisherRepository } from '../../../infra/typeorm/repositories/PublisherRepository';
import { ListAllPublishersController } from './ListAllPublishersController';
import { ListAllPublishersUseCase } from './ListAllPublishersUseCase';

const publisherRepository = new PublisherRepository();
const listAllPublishersUseCase = new ListAllPublishersUseCase(publisherRepository);
const listAllPublishersController = new ListAllPublishersController(listAllPublishersUseCase);

export { listAllPublishersController }