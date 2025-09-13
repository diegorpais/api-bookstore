import { Router } from "express";
import { createPublisherController } from './domain/useCases/createPublisher';
import { listAllPublishersController } from './domain/useCases/listAllPublishers';

const publisherRoutes = Router();

publisherRoutes.post("/", (req, res) => {
  return createPublisherController.handle(req, res);
});

publisherRoutes.get("/", (req, res) => {
  return listAllPublishersController.handle(req, res);
});

export { publisherRoutes };