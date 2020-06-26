import { Request, Response, Router } from 'express';
import PageController from '@lib/page_controller';
import { withCatch } from '@shared/hofs';

const stylesheets = ['about.css'];
const scripts = ['about.js'];

export default class AboutPageController extends PageController {
    path: string;
    router: Router;

    constructor(router: typeof Router) {
        super(stylesheets, scripts);

        this.path = '/about';
        this.router = router();
        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._renderPage);
    };

    private _renderPage = withCatch(async (req: Request, res: Response) => {
        const stylesheets = this._stylesheets;
        const scripts = this._scripts;

        res.render('pages/about', {
            title: 'TYPESCRIPT-EXPRESS-MPS | About',
            stylesheets,
            scripts,
        });
    });
}
