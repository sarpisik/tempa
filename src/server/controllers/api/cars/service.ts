import { readCars } from '@shared/functions';
import { ICar } from './interface';
import { Car } from './model';

export default class CarService {
    findMany(): Promise<ICar[]> {
        return readCars();
    }
    async createOne(
        car_model: string,
        car_make: string,
        car_model_year: number
    ) {
        const car = await new Car(car_model, car_make, car_model_year);
        return car;
    }
}
