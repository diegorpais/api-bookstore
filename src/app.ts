import express from 'express';

import { authorRoutes } from './modules/authors/author.routes';

const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);

app.use

export { app };