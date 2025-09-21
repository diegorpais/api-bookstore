import { Router } from "express";
import { createCategoryController } from './domain/useCases/createCategory';
import { listAllCategoriesController } from './domain/useCases/listAllCategories';
import { listAllCategoriesPaginatedController } from './domain/useCases/listAllCategoriesPaginated';

const categoryRoutes = Router();

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRoutes.get("/", (request, response) => {
  return listAllCategoriesController.handle(request, response);
});

categoryRoutes.get("/paginated", (request, response) => {
  return listAllCategoriesPaginatedController.handle(request, response);
});

export { categoryRoutes };
