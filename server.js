const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const DarkSkyApi = require('dark-sky-api');
const pjson = require('./package.json');
require('dotenv').config();

process.env.APP_ENV === 'dev' ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV = 'production';

const app = express();

/** Configure DarkSkyApi **/
DarkSkyApi.apiKey = process.env.DARKSKY_SECRET_KEY;
DarkSkyApi.proxy = true;

/** Logs configuration **/
// Set logs directory
const logsDir = path.join(__dirname, 'logs');
// Ensure logs directory exists
fs.existsSync(logsDir) || fs.mkdirSync(logsDir);
// Create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logsDir
});

/** View engine setup **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** Express configuration **/
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger(
    process.env.APP_ENV === 'dev' ? process.env.APP_ENV : 'combined',
    process.env.APP_ENV === 'dev' ? null : {stream: accessLogStream}
    ));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    let keywords = '';

    pjson.keywords.map((keyword, index) => keywords += index !== 0 ? `, ${keyword}` : keyword);

    res.render('index', {
        title: pjson.name,
        description: pjson.description,
        version: pjson.version,
        author: pjson.author,
        keywords: keywords,
        netatmo: {
            client_id: process.env.NETATMO_CLIENT_ID,
            client_secret: process.env.NETATMO_CLIENT_SECRET,
            username: process.env.NETATMO_USERNAME,
            password: process.env.NETATMO_PASSWORD
        }
    });
});

app.get('/darksky/:latitude/:longitude/:lang/:units', (req, res, next) => {
    if (!req.params.latitude ||
        !req.params.longitude ||
        !req.params.lang ||
        !req.params.units) return res.status(400).json({status: 'error', msg: 'Bad request'});

    DarkSkyApi.units = req.params.units; // default 'us'
    DarkSkyApi.language = req.params.lang; // default 'en'

    const position = {
        latitude: req.params.latitude,
        longitude: req.params.longitude
    };

    DarkSkyApi.loadItAll('hourly,flags', position)
        .then(result => {
            res.json(result)
            })
});

/** Catch 404 and forward to error handler **/
app.use((req, res, next) => {
    next(createError(404));
});

/** Errors handler **/
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000 as ' + process.env.NODE_ENV)
});
