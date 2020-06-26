import { apiControllers } from './api';
import { pageControllers } from './pages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const controllers = pageControllers.concat(apiControllers);

export default controllers;
