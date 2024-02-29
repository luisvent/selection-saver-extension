const express = require('express');
const config = require('./startup/config');
const production = require('./startup/production');
const connectionDB = require('./startup/connection');
const initApp = require('./startup/init_app');
const logging = require('./startup/logging');
const routes = require('./startup/routes');
const validation = require('./startup/validation');

const app = express();

logging.init(app);
connectionDB.init();
config.init(app);
routes.init(app);
production.init(app);
initApp.init(app);

module.exports = app;
