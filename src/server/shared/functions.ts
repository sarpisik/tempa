import fs from 'fs';
import path from 'path';
import logger from './Logger';

export const pErr = (err: Error): void => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = (): number => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export function readCars<T>() {
    return new Promise<T[]>(function findManyPromise(resolve, reject) {
        fs.readFile(
            path.resolve(__dirname, '../db/cars.json'),
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
