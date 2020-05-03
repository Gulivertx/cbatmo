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
const request = require('request-promise');
require('dotenv').config();

process.env.APP_ENV === 'dev' ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV = 'production';

const app = express();

/** Configure DarkSkyApi **/
DarkSkyApi.apiKey = process.env.DARKSKY_SECRET_KEY;
DarkSkyApi.proxy = true;

/** Configure OpenWeather **/
const openWeatherSettings = {
    url: 'https://api.openweathermap.org/data/2.5/onecall',
    api_key: process.env.OPENWEATHER_API_KEY,
};

/** Configure Netatmo API **/
const netatmoSettings = {
    url: 'https://api.netatmo.com/',
    client_id: process.env.NETATMO_CLIENT_ID,
    client_secret: process.env.NETATMO_CLIENT_SECRET
};

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
        keywords: keywords
    });
});

/** Request promise handler **/
const handleRequestPromise = (res, next, options) => {
    request(options)
        .then(result => {
            return res.json(result)
        })
        .catch(error => {
            console.log(error)
            // If no error we still want to check the status code
            if (error.statusCode !== 500) {
                const exception = error.error;
                return res.status(error.statusCode).json({status: 'error', msg: exception.message});
            }
            return next(error);
        });
};

app.post('/netatmo-auth', (req, res, next) => {
    // We want to verify that each needed parameters are set in the request
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({status: 'error', msg: 'Bad request'});

    const options = {
        method: 'POST',
        uri: `${netatmoSettings.url}oauth2/token`,
        form: {
            client_id: netatmoSettings.client_id,
            client_secret: netatmoSettings.client_secret,
            grant_type: 'password',
            scope: 'read_station',
            username: username,
            password: password
        },
        json: true
    };

    handleRequestPromise(res, next,  options);
});

app.post('/netatmo-refresh-token', (req, res, next) => {
    // We want to verify that each needed parameters are set in the request
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) return res.status(400).json({status: 'error', msg: 'Bad request'});

    const options = {
        method: 'POST',
        uri: `${netatmoSettings.url}oauth2/token`,
        form: {
            client_id: netatmoSettings.client_id,
            client_secret: netatmoSettings.client_secret,
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    handleRequestPromise(res, next,  options);
});

app.post('/netatmo-station-data', (req, res, next) => {
    // We want to verify that each needed parameters are set in the request
    const access_token = req.body.access_token;
    if (!access_token) return res.status(400).json({status: 'error', msg: 'Bad request'});

    const options = {
        uri: `${netatmoSettings.url}api/getstationsdata`,
        qs: {
            access_token: access_token
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    handleRequestPromise(res, next,  options);
});

app.post('/netatmo-measure', (req, res, next) => {
    // We want to verify that each needed parameters are set in the request
    const {access_token, device_id, module_id, scale, type, date_begin, date_end} = req.body;
    if (!access_token ||
        !device_id ||
        !module_id ||
        !scale ||
        !type ||
        !date_begin ||
        !date_end ) return res.status(400).json({status: 'error', msg: 'Bad request'});

    const options = {
        uri: `${netatmoSettings.url}api/getmeasure`,
        qs: {
            access_token: access_token,
            device_id: device_id,
            module_id: module_id,
            scale: scale,
            type: type,
            date_begin: date_begin,
            date_end: date_end,
            optimize: 'false'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    handleRequestPromise(res, next,  options);
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
    let {latitude, longitude, units, lang} = req.params;
    if (!latitude || !longitude || !lang || !units) return res.status(400).json({status: 'error', msg: 'Bad request'});

    // Bind netatmo unit to openweather unit
    if (units === 'si') {
        units = 'metric'
    } else {
        units = 'imperial'
    }

    const options = {
        uri: openWeatherSettings.url,
        qs: {
            lat: latitude,
            lon: longitude,
            units: units,
            lang: lang,
            appid: openWeatherSettings.api_key
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    handleRequestPromise(res, next,  options);
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
