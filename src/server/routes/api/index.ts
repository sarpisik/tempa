import { Router } from 'express';
import { car } from './cars/router';

export const api = Router();

api.use('/cars', car);
