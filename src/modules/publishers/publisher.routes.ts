import { Router } from "express";
import { createPublisherController } from './domain/useCases/createPublisher';

const publisherRoutes = Router();

publisherRoutes.post("/", (req, res) => {
  return createPublisherController.handle(req, res);
});

export { publisherRoutes };