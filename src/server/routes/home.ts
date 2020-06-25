import { Request, Response, Router } from 'express';
import { manifestParser, srcGenerator } from '@lib/assets_loader';

export const home = Router();

home.get('/', (req: Request, res: Response) => {
    let stylesheets: string[];
    let scripts: string[];
    if (req.app.locals.production) {
        const manifest = manifestParser();

        stylesheets = [manifest['home.css']];
        scripts = [manifest['home.js'], manifest['vendor.js']];
    } else {
        stylesheets = ['home.css'].map(srcGenerator);
        scripts = ['home.js', 'vendor.js'].map(srcGenerator);
    }

    res.render('pages/home', {
        title: 'TYPESCRIPT-EXPRESS-MPS | Home',
        stylesheets,
        scripts,
    });
});
