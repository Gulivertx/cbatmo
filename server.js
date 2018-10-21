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
const os = require('os');
const DarkSkyApi = require('dark-sky-api');

const common = require('./config/common');
const config = common.config();
const appInfo = common.info();
const apiConfig = require('./config/api');

const app = express();

/** Configure DarkSkyApi **/
DarkSkyApi.apiKey = apiConfig.dark_sky.secret_key;
DarkSkyApi.proxy = true;

/** Logs configuration **/
// Set logs directory
const logsDir = path.join(__dirname, 'logs');
// Ensure logs directory exists
fs.existsSync(logsDir) || fs.mkdirSync(logsDir);
// Create a rotating write stream
const accessLogStream = rfs('access.log', {
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
app.use(logger(config.log, config.log === 'dev' ? null : {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index', {
        title: appInfo.name,
        description: appInfo.description,
        version: appInfo.version,
        author: appInfo.author,
        keywords: appInfo.keywords
    });
});

app.get('/info', (req, res, next) => {
    res.json({
        name: appInfo.name,
        description: appInfo.description,
        version: appInfo.version,
        author: appInfo.author,
        process: {
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            hostname: os.hostname(),
            type: os.type(),
            cpuload: os.loadavg(),
            usedmem: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024),
            totalmem: Math.round(os.totalmem() / 1024 / 1024),
            uptime: getTimeString(os.uptime() * 1000)

        }
    })
});

app.get('/darksky/:latitude/:longitude/:lang/:units', (req, res, next) => {
    if (!req.params.latitude ||
        !req.params.longitude ||
        !req.params.lang ||
        !req.params.units) return res.status(400).json({status: 'error', msg: 'Bad request'});

    console.log(req.params.latitude, req.params.longitude, req.params.lang, req.params.units);

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
    console.log('Server running on http://localhost:3000')
});

const getTimeString = (milli) => {
    let d, h, m, s, ms;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60; s = s < 10 ? '0' + s : s;
    h = Math.floor(m / 60);
    m = m % 60; m = m < 10 ? '0' + m : m;
    d = Math.floor(h / 24);
    h = h % 24; h = h < 10 ? '0' + h : h;
    ms = Math.floor((milli % 1000) * 1000) / 1000;
    return `${d}d ${h}:${m}:${s}`;
};
