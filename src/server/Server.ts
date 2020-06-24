import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { manifestParser, srcGenerator } from '@lib/assets_loader';

// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response) => {
    const manifest = manifestParser();
    const stylesheets = [manifest['home.css']].map(srcGenerator);
    const scripts = [manifest['home.js'], manifest['vendor.js']].map(
        srcGenerator
    );
    res.render('pages/home', {
        title: 'TYPESCRIPT-EXPRESS-MPS',
        content: 'Hello World!',
        stylesheets,
        scripts,
    });
});
app.get('/about', (req: Request, res: Response) => {
    const manifest = manifestParser();
    const stylesheets = [manifest['about.css']].map(srcGenerator);
    const scripts = [manifest['about.js']].map(srcGenerator);
    res.render('pages/about', {
        title: 'TYPESCRIPT-EXPRESS-MPS',
        content: 'About page',
        stylesheets,
        scripts,
    });
});

// Export express instance
export default app;
