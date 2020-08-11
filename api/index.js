const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const config = require('../config.js');
const songs = require('./components/Songs/network');

const app = express();

expressJSDocSwagger(app)(config.api.swaggerOptions);
app.use(cors());
app.use(helmet());
app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }));
app.use('/api/v1/songs', songs);

module.exports = app;
