import { Router } from "express";
import { createCategoryController } from './domain/useCases/createCategory';

const categoryRoutes = Router();

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

export { categoryRoutes };
