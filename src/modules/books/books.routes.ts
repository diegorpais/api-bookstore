import { Router } from 'express';
import { createBookController } from './domain/useCases/createBook';
import { listAllBooksPaginatedController } from './domain/useCases/listAllBooksPaginated';

const bookRoutes = Router();

bookRoutes.get("/", (request, response) => {
  return listAllBooksPaginatedController.handle(request, response);
});

bookRoutes.post("/", (req, res) => {
  return createBookController.handle(req, res);
});

export { bookRoutes };