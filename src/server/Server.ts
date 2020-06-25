/* eslint-disable @typescript-eslint/no-var-requires */
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

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// Init express
const app = express();

/************************************************************************************
 *                              Set hot module reload in development
 ***********************************************************************************/

if (isDev) {
    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('../client/webpack.config');
    const compiler = webpack(config);

    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            stats: false,
        })
    );
    app.use(webpackHotMiddleware(compiler));
}

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (isDev) {
    app.use(morgan('dev'));
}

// Security
if (isProd) {
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
    let stylesheets: string[];
    let scripts: string[];
    if (isProd) {
        const manifest = manifestParser();

        stylesheets = [manifest['home.css']].map(srcGenerator);
        scripts = [manifest['home.js'], manifest['vendor.js']].map(
            srcGenerator
        );
    } else {
        stylesheets = ['home.css'].map(srcGenerator);
        scripts = ['home.js', 'vendor.js'].map(srcGenerator);
    }

    res.render('pages/home', {
        title: 'TYPESCRIPT-EXPRESS-MPS',
        content: 'Hello World!',
        stylesheets,
        scripts,
    });
});
app.get('/about', (req: Request, res: Response) => {
    let stylesheets: string[];
    let scripts: string[];
    if (isProd) {
        const manifest = manifestParser();

        stylesheets = [manifest['about.css']].map(srcGenerator);
        scripts = [manifest['about.js'], manifest['vendor.js']].map(
            srcGenerator
        );
    } else {
        stylesheets = ['about.css'].map(srcGenerator);
        scripts = ['about.js', 'vendor.js'].map(srcGenerator);
    }

    res.render('pages/about', {
        title: 'TYPESCRIPT-EXPRESS-MPS',
        content: 'About page',
        stylesheets,
        scripts,
    });
});

// Export express instance
export default app;
