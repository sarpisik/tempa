import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import app from '@server';
import UserDao from '@daos/User/UserDao.mock';
import User, { IUser } from '@entities/User';
import { pErr, readCars } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import CarService from 'src/server/controllers/api/cars/service';
import { Car } from 'src/server/controllers/api/cars/model';

describe('Cars Routes', () => {
    const carsPath = '/api/cars';
    const addcarsPath = `${carsPath}/`;
    const updateUserPath = `${carsPath}/update`;
    const deleteUserPath = `${carsPath}/delete/:id`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${carsPath}"`, () => {
        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {
            readCars().then((cars) => {
                agent.get(carsPath).end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.cars.length).toEqual(cars.length);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
            });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Could not fetch cars.';
            spyOn(CarService.prototype, 'findMany').and.throwError(errMsg);

            agent.get(carsPath).end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });

    describe(`"POST:${addcarsPath}"`, () => {
        // const callApi = (reqBody: Record<string, unknown>) => {
        //     return agent.post(addcarsPath).type('form').send(reqBody);
        // };

        const carData = {
            car: {
                car_model: 'Scirocco',
                car_make: 'Volkswagen',
                car_model_year: 1988,
            },
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            spyOn(UserDao.prototype, 'add').and.returnValue(Promise.resolve());

            agent
                .post(addcarsPath)
                .type('form')
                .send(carData) // pick up here
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        // it(`should return a JSON Record<string, unknown> with an error message of "${paramMissingError}" and a status
        //     code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
        //     callApi({}).end((err: Error, res: Response) => {
        //         pErr(err);
        //         expect(res.status).toBe(BAD_REQUEST);
        //         expect(res.body.error).toBe(paramMissingError);
        //         done();
        //     });
        // });

        // it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
        //     if the request was unsuccessful.`, (done) => {
        //     const errMsg = 'Could not add user.';
        //     spyOn(UserDao.prototype, 'add').and.throwError(errMsg);

        //     callApi(carData).end((err: Error, res: Response) => {
        //         pErr(err);
        //         expect(res.status).toBe(BAD_REQUEST);
        //         expect(res.body.error).toBe(errMsg);
        //         done();
        //     });
        // });
    });

    // describe(`"PUT:${updateUserPath}"`, () => {
    //     const callApi = (reqBody: Record<string, unknown>) => {
    //         return agent.put(updateUserPath).type('form').send(reqBody);
    //     };

    //     const carData = {
    //         user: new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
    //     };

    //     it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
    //         spyOn(UserDao.prototype, 'update').and.returnValue(
    //             Promise.resolve()
    //         );

    //         callApi(carData).end((err: Error, res: Response) => {
    //             pErr(err);
    //             expect(res.status).toBe(OK);
    //             expect(res.body.error).toBeUndefined();
    //             done();
    //         });
    //     });

    //     it(`should return a JSON object with an error message of "${paramMissingError}" and a
    //         status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
    //         callApi({}).end((err: Error, res: Response) => {
    //             pErr(err);
    //             expect(res.status).toBe(BAD_REQUEST);
    //             expect(res.body.error).toBe(paramMissingError);
    //             done();
    //         });
    //     });

    //     it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
    //         if the request was unsuccessful.`, (done) => {
    //         const updateErrMsg = 'Could not update user.';
    //         spyOn(UserDao.prototype, 'update').and.throwError(updateErrMsg);

    //         callApi(carData).end((err: Error, res: Response) => {
    //             pErr(err);
    //             expect(res.status).toBe(BAD_REQUEST);
    //             expect(res.body.error).toBe(updateErrMsg);
    //             done();
    //         });
    //     });
    // });

    // describe(`"DELETE:${deleteUserPath}"`, () => {
    //     const callApi = (id: number) => {
    //         return agent.delete(deleteUserPath.replace(':id', id.toString()));
    //     };

    //     it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
    //         spyOn(UserDao.prototype, 'delete').and.returnValue(
    //             Promise.resolve()
    //         );

    //         callApi(5).end((err: Error, res: Response) => {
    //             pErr(err);
    //             expect(res.status).toBe(OK);
    //             expect(res.body.error).toBeUndefined();
    //             done();
    //         });
    //     });

    //     it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
    //         if the request was unsuccessful.`, (done) => {
    //         const deleteErrMsg = 'Could not delete user.';
    //         spyOn(UserDao.prototype, 'delete').and.throwError(deleteErrMsg);

    //         callApi(1).end((err: Error, res: Response) => {
    //             pErr(err);
    //             expect(res.status).toBe(BAD_REQUEST);
    //             expect(res.body.error).toBe(deleteErrMsg);
    //             done();
    //         });
    //     });
    // });
});
