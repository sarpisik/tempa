import { Router } from 'express';
import { all } from './controller';

export const car = Router();

car.get('/', all);
