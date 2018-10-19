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

const common = require('./config/common');
const config = common.config();
const appInfo = common.info();

const app = express();

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
        author: appInfo.author
    });
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
