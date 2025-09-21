import { Router } from "express";
import { createCategoryController } from './domain/useCases/createCategory';
import { listAllCategoriesController } from './domain/useCases/listAllCategories';
import { listAllCategoriesPaginatedController } from './domain/useCases/listAllCategoriesPaginated';
import { deleteCategoryController } from './domain/useCases/deleteCategory';
import { findCategoryByIdController } from './domain/useCases/findCategoryById';
import { updateCategoryController } from './domain/useCases/updateCategory';

const categoryRoutes = Router();

categoryRoutes.get("/", (request, response) => {
  return listAllCategoriesController.handle(request, response);
});

categoryRoutes.get("/:id", (request, response) => {
  return findCategoryByIdController.handle(request, response);
});

categoryRoutes.get("/paginated", (request, response) => {
  return listAllCategoriesPaginatedController.handle(request, response);
});

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRoutes.patch("/:id", (request, response) => {
  return updateCategoryController.handle(request, response);
});

categoryRoutes.delete("/:id", (request, response) => {
  return deleteCategoryController.handle(request, response);
});

export { categoryRoutes };
