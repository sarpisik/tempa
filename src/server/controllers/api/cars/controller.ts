import { Request, Response } from 'express';
import Controller, { RouterType } from '@lib/controller';
import { withCatch } from '@shared/hofs';
import CarService from './service';

export default class CarController extends Controller {
    private _service: CarService;

    constructor(router: RouterType, carService: typeof CarService) {
        super(router, '/api/cars');

        this._service = new carService();
        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._getAllCars);
    };

    private _getAllCars = withCatch(async (_req: Request, res: Response) => {
        const cars = await this._service.findMany();
        res.json({ cars });
    });
}
