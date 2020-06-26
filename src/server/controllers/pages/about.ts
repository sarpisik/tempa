import { Request, Response, Router } from 'express';
import { manifestParser, srcGenerator } from '@lib/assets_loader';
import { withCatch } from '@shared/hofs';

export default class AboutPageController {
    path: string;
    router: Router;

    constructor(router: typeof Router) {
        this.path = '/about';
        this.router = router();
        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._renderPage);
    };

    private _renderPage = withCatch(async (req: Request, res: Response) => {
        let stylesheets: string[];
        let scripts: string[];
        if (req.app.locals.production) {
            const manifest = manifestParser();

            stylesheets = [manifest['about.css']];
            scripts = [manifest['about.js'], manifest['vendor.js']];
        } else {
            stylesheets = ['about.css'].map(srcGenerator);
            scripts = ['about.js', 'vendor.js'].map(srcGenerator);
        }

        res.render('pages/about', {
            title: 'TYPESCRIPT-EXPRESS-MPS | About',
            stylesheets,
            scripts,
        });
    });
}
