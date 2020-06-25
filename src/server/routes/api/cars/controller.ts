import { withCatch } from '@shared/hofs';
import { Request, Response } from 'express';
import CarService from './service';

const carService = new CarService();

export const all = withCatch(async function all(_req: Request, res: Response) {
    const cars = await carService.findMany();
    res.json({ cars });
});
