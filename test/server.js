import express from 'express';
import { resolve } from 'path';

import restMockMiddleware from '../index';

const createServer = (options) => {
    var app = express();
    app.use(
        '/app',
        restMockMiddleware({
            root_dir: resolve(__dirname, options.root_dir),
            logger: options.logger,
            loggerDebugFilters: options.loggerDebugFilters,
        }),
    );

    return app;
};

export default createServer;
