import { readCars } from '@shared/functions';
import { Database } from '@shared/types';

export default async function database(): Promise<Database> {
    const cars = await readCars<Database['cars'][number]>();
    return { cars };
}
