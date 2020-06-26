/* eslint-disable @typescript-eslint/no-var-requires */
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import expressStaticGzip from 'express-static-gzip';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import controllers from './controllers';
import logger from '@shared/Logger';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// Init express
const app = express();

/************************************************************************************
 *                              Set development settings
 ***********************************************************************************/

if (isDev) {
    // hot module reload
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

    // Show routes called in console
    app.use(morgan('dev'));
}

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Pass environment state to handlers
app.locals.production = isProd;

/************************************************************************************
 *                              Set production settings
 ***********************************************************************************/

if (isProd) {
    // Security
    app.use(helmet());

    // Serve zipped static files
    app.use(
        '/',
        expressStaticGzip(path.join(__dirname, 'public'), { index: false })
    );
}

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

/************************************************************************************
 *                              Serve controllers
 ***********************************************************************************/

controllers.forEach((controller) => {
    app.use('/', controller.router);
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// Export express instance
export default app;
