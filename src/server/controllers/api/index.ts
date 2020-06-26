import { Router } from 'express';
import CarController from './cars/controller';
import CarService from './cars/service';

export const apiControllers = [new CarController(Router, CarService)];
