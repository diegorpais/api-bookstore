import express from 'express';
import swaggerUi from 'swagger-ui-express';

import authorsSwagger from './docs/authors-swagger.json';
import publishersSwagger from './docs/publishers-swagger.json';
import categoriesSwagger from './docs/categories-swagger.json';

import { authorRoutes } from './modules/authors/author.routes';
import { publisherRoutes } from './modules/publishers/publisher.routes';
import { categoryRoutes } from './modules/categories/categories.routes';

const SWAGGER_VERSION = '/swagger/v1';
const API_VERSION = '/api/v1';

const app = express();
app.use(express.json());

/** SWAGGER ROUTES */
app.use(`${SWAGGER_VERSION}/authors`, swaggerUi.serveFiles(authorsSwagger), swaggerUi.setup(authorsSwagger));
app.use(`${SWAGGER_VERSION}/publishers`, swaggerUi.serveFiles(publishersSwagger), swaggerUi.setup(publishersSwagger));
app.use(`${SWAGGER_VERSION}/categories`, swaggerUi.serveFiles(categoriesSwagger), swaggerUi.setup(categoriesSwagger));

/** API ROUTES */
app.use(`${API_VERSION}/authors`, authorRoutes);
app.use(`${API_VERSION}/publishers`, publisherRoutes);
app.use(`${API_VERSION}/categories`, categoryRoutes);

export { app };