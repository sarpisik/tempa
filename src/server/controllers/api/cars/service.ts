import { readCars } from '@shared/functions';
import { ICar } from './interface';

export default class CarService {
    findMany(): Promise<ICar[]> {
        return readCars();
    }
}
