import { ICar } from './interface';

export class Car implements ICar {
    id: number;

    constructor(
        public car_model: string,
        public car_make: string,
        public car_model_year: number
    ) {
        this.id = Date.now();
    }
}
