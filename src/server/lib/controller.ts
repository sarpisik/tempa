import { Router } from 'express';

export default class Controller {
    router: Router;

    constructor(router: typeof Router, public path: string) {
        this.router = router();
    }
}
