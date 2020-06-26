import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import Controller, { RouterType } from '@lib/controller';
import { BadRequestError } from '@shared/error';
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
        this.router.post(this.path, this._createCar);
    };

    private _getAllCars = withCatch(async (_req: Request, res: Response) => {
        const cars = await this._service.findMany();
        res.json({ cars });
    });

    private _createCar = withCatch(async ({ body }: Request, res: Response) => {
        if (!body.car) throw new BadRequestError();

        const { car_model, car_make, car_model_year } = body.car;

        const car = await this._service.createOne(
            car_model,
            car_make,
            car_model_year
        );

        res.status(CREATED).json({ car });
    });
}
