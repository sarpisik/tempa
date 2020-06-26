import { environment } from '@shared/constants';

export default class PageController {
    protected _stylesheets: string[];
    protected _scripts: string[];

    constructor(stylesheets: string[], scripts: string[]) {
        if (environment === 'production') {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { manifestParser } = require('./assets_loader');
            const manifest = manifestParser();
            this._stylesheets = stylesheets.map(
                (stylesheet) => manifest[stylesheet]
            );
            this._scripts = scripts.map((script) => manifest[script]);
        } else {
            this._stylesheets = stylesheets;
            this._scripts = scripts;
        }
    }

    protected _generateLocals = (title: string) => {
        const stylesheets = this._stylesheets;
        const scripts = this._scripts;

        return { stylesheets, scripts, title };
    };
}
