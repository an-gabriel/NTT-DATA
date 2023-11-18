import * as dotenv from 'dotenv';
import express from 'express';

import helmet from 'helmet';
import cors from 'cors';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import SwaggerOptions from '@/config/swagger';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

const swaggerSpec = swaggerJSDoc(new SwaggerOptions().getOptions());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;