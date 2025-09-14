import { Router } from "express";
import { createPublisherController } from './domain/useCases/createPublisher';
import { listAllPublishersController } from './domain/useCases/listAllPublishers';
import { findPublisherByIdController } from './domain/useCases/findPublisherById';

const publisherRoutes = Router();

publisherRoutes.post("/", (req, res) => {
  return createPublisherController.handle(req, res);
});

publisherRoutes.get("/", (req, res) => {
  return listAllPublishersController.handle(req, res);
});

publisherRoutes.get("/:id", (req, res) => {
  return findPublisherByIdController.handle(req, res);
});

export { publisherRoutes };
