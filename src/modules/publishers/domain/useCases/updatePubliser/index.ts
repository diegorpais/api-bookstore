import { PublisherRepository } from '../../../infra/typeorm/repositories/PublisherRepository';
import { UpdatePublisherController } from './UpdatePublisherController';
import { UpdatePublisherUseCase } from './UpdatePublisherUseCase';

const publisherRepository = new PublisherRepository();
const updatePublisherUseCase = new UpdatePublisherUseCase(publisherRepository);
const updatePublisherController = new UpdatePublisherController(updatePublisherUseCase);

export { updatePublisherController }
