import { Router } from "express";
import { createPublisherController } from './domain/useCases/createPublisher';
import { listAllPublishersController } from './domain/useCases/listAllPublishers';
import { findPublisherByIdController } from './domain/useCases/findPublisherById';
import { updatePublisherController } from './domain/useCases/updatePubliser';
import { deletePublisherController } from './domain/useCases/deletePublisher';

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

publisherRoutes.patch("/:id", (req, res) => {
  return updatePublisherController.handle(req, res);
});

publisherRoutes.delete("/:id", (req, res) => {
  return deletePublisherController.handle(req, res);
});

export { publisherRoutes };
