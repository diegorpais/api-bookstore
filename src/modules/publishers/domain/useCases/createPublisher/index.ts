import { PublisherRepository } from '../../../infra/typeorm/repositories/PublisherRepository';
import { CreatePublisherController } from './CreatePublisherController';
import { CreatePublisherUseCase } from './CreatePublisherUseCase';

const publisherRepository = new PublisherRepository();

const createPublisherUseCase = new CreatePublisherUseCase(publisherRepository);
const createPublisherController = new CreatePublisherController(createPublisherUseCase);

export { createPublisherController }