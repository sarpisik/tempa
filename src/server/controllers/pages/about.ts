import { Request, Response, Router } from 'express';
import PageController from '@lib/page_controller';
import { withCatch } from '@shared/hofs';

const TITLE = 'TYPESCRIPT-EXPRESS-MPS | Home';
const STYLESHEETS = ['about.css'];
const SCRIPTS = ['about.js'];

export default class AboutPageController extends PageController {
    path: string;
    router: Router;

    constructor(router: typeof Router) {
        super(STYLESHEETS, SCRIPTS);

        this.path = '/about';
        this.router = router();
        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._renderPage);
    };

    private _renderPage = withCatch(async (_req: Request, res: Response) => {
        const locals = this._generateLocals(TITLE);

        res.render('pages/about', locals);
    });
}
