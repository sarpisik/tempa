import { ICar } from './interface';
import { Car } from './model';
import { BadRequestError } from '@shared/error';

export default class CarService {
    constructor(private _db: { cars: ICar[] }) {}

    findMany(): Promise<ICar[]> {
        return Promise.resolve(this._db.cars);
    }
    async createOne(
        car_model: string,
        car_make: string,
        car_model_year: string | number
    ) {
        const car = await new Car(
            car_model,
            car_make,
            strToNum(car_model_year)
        );
        this._db.cars.push(car);
        return car;
    }
    async updateOne(_id: string | number, updateCar: Omit<ICar, 'id'>) {
        const id = strToNum(_id);
        const cars = this._db.cars;
        const car = cars.find((car) => car.id === id);

        if (!car) throw new BadRequestError();

        const keys = Object.keys(updateCar) as Array<keyof typeof updateCar>;

        for await (const key of keys) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            car[key] = updateCar[key];
        }

        return car;
    }
}

function strToNum(data: string | number): number {
    return typeof data === 'number' ? data : parseInt(data);
}
