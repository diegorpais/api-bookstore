import { PublisherRepository } from '../../../infra/typeorm/repositories/PublisherRepository';
import { FindPublisherByIdController } from './FindPublisherByIdController';
import { FindPublisherByIdUseCase } from './FindPublisherByIdUseCase';

const publisherRepository = new PublisherRepository();
const findPublisherByIdUseCase = new FindPublisherByIdUseCase(publisherRepository);
const findPublisherByIdController = new FindPublisherByIdController(findPublisherByIdUseCase);

export { findPublisherByIdController };
