import { Router } from "express";

const authorRoutes = Router();

import { createAuthorController } from "./domain/useCases/createAuthor";
import { listAllAuthorsController } from './domain/useCases/listAllAuthors';
import { findAuthorByIdController } from './domain/useCases/findAuthorById';


authorRoutes.post("/", (request, response) => {
  return createAuthorController.handle(request, response);
});

authorRoutes.get("/", (request, response) => {
  return listAllAuthorsController.handle(request, response);
});

authorRoutes.get("/:id", (request, response) => {
  return findAuthorByIdController.handle(request, response);
});

export { authorRoutes };