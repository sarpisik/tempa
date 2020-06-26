import { Request, Response } from 'express';
import { CREATED, OK } from 'http-status-codes';
import Controller, { RouterType } from '@lib/controller';
import { BadRequestError } from '@shared/error';
import { withCatch } from '@shared/hofs';
import CarService from './service';

export default class CarController extends Controller {
    constructor(router: RouterType, private _carService: CarService) {
        super(router, '/api/cars');

        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._getAllCars);
        this.router.post(this.path, this._createCar);
        this.router.put(this.path + '/:id', this._updateCar);
    };

    private _getAllCars = withCatch(async (_req: Request, res: Response) => {
        const cars = await this._carService.findMany();
        res.json({ cars });
    });

    private _createCar = withCatch(async ({ body }: Request, res: Response) => {
        if (!body.car) throw new BadRequestError();

        const { car_model, car_make, car_model_year } = body.car;

        const car = await this._carService.createOne(
            car_model,
            car_make,
            car_model_year
        );

        res.status(CREATED).json({ car });
    });

    private _updateCar = withCatch(
        async ({ body, params: { id } }: Request, res: Response) => {
            if (!body.car) throw new BadRequestError();

            const car = await this._carService.updateOne(id, body.car);

            res.status(OK).json({ car });
        }
    );
}
