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
const request = require('request');
require('dotenv').config();

process.env.APP_ENV === 'dev' ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV = 'production';

const app = express();

/** Configure DarkSkyApi **/
DarkSkyApi.apiKey = process.env.DARKSKY_SECRET_KEY;
DarkSkyApi.proxy = true;

/** Configure OpenWeather **/
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

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
    // We want to verify that each needed parameters are set in the request
    const {latitude, longitude, units, lang} = req.params;

    if (!latitude || !longitude || !lang || !units) return res.status(400).json({status: 'error', msg: 'Bad request'});

    DarkSkyApi.units = units; // default 'us'
    DarkSkyApi.language = lang; // default 'en'

    const position = {
        latitude: latitude,
        longitude: longitude
    };

    DarkSkyApi.loadItAll('hourly,flags', position)
        .then(result => {
            res.json(result)
            })
});

app.get('/openweather/:latitude/:longitude/:lang/:units', (req, res, next) => {
    // We want to verify that each needed parameters are set in the request
    const {latitude, longitude, units, lang} = req.params;

    if (!latitude || !longitude || !lang || !units) return res.status(400).json({status: 'error', msg: 'Bad request'});

    request.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${openWeatherApiKey}`, (error, result) => {
        if (error) return next(error);

        // If no error we still want to check the status code
        if (result.statusCode !== 200) {
            const exception = JSON.parse(result.body);
            return res.status(result.statusCode).json({status: 'error', msg: exception.message});
        }
        res.json(JSON.parse(result.body))
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
