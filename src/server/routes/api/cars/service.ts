import fs from 'fs';
import path from 'path';
import { Car } from './interface';

export default class CarService {
    findMany(): Promise<Car[]> {
        return new Promise<Car[]>(function findManyPromise(resolve, reject) {
            fs.readFile(
                path.resolve(__dirname, './cars.json'),
                function onCarsFileRead(err, raw) {
                    if (err) {
                        reject(err);
                    } else {
                        const cars = JSON.parse(raw.toString());
                        resolve(cars);
                    }
                }
            );
        });
    }
}
