import 'rootpath';
import express from 'express';
import cors from 'cors';
import errorHandler from './_middleware/error-handler';
import usersController from './users/users.controller';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/users', usersController);

// Global error handler
app.use(errorHandler);

// Start server
const port: number = process.env.NODE_ENV === 'production' ? Number(process.env.PORT) || 80 : 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
