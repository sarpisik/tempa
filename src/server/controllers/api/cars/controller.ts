import { Request, Response, Router } from 'express';
import { withCatch } from '@shared/hofs';
import CarService from './service';

export default class CarController {
    path: string;
    router: Router;
    private _service: CarService;

    constructor(router: typeof Router, carService: typeof CarService) {
        this.path = '/cars';
        this.router = router();
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
