import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';

import { authorRoutes } from './modules/authors/author.routes';

const app = express();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/authors`, authorRoutes);

app.use

export { app };