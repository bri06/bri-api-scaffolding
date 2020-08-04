const express = require('express');

const expressJSDocSwagger = require('express-jsdoc-swagger');

const config = require('../config.js');
const songs = require('./components/Songs/network');

const app = express();

expressJSDocSwagger(app)(config.api.swaggerOptions);
app.use('/api/v1/songs', songs);

module.exports = app;
