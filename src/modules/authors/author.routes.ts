import { Router } from "express";

const authorRoutes = Router();

import { createAuthorController } from "./domain/useCases/createAuthor";
import { listAllAuthorsController } from './domain/useCases/listAllAuthors';
import { listAuthorController } from './domain/useCases/listAuthor';

authorRoutes.post("/", (request, response) => {
  return createAuthorController.handle(request, response);
});

authorRoutes.get("/", (request, response) => {
  return listAllAuthorsController.handle(request, response);
});

authorRoutes.get("/:id", (request, response) => {
  return listAuthorController.handle(request, response);
});

export { authorRoutes };