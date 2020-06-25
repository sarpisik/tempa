const path = require('path');

module.exports = {
    generatePageReducer(isProd) {
        return function pageReducer(pages, pageName) {
            const hmrPath = pageName === 'home' ? '' : pageName;
            const pagePath = path.resolve(__dirname, `../scripts/${pageName}.ts`);
            pages[pageName] = isProd
                ? pagePath
                : [
                      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
                      pagePath,
                  ];
            return pages;
        };
    },
};
