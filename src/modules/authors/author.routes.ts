import { Router } from "express";

const authorRoutes = Router();

import { createAuthorController } from "./domain/useCases/createAuthor";

authorRoutes.post("/", (request, response) => {
  return createAuthorController.handle(request, response);
});

export { authorRoutes };