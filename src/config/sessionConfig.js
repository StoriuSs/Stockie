const session = require('express-session');

const sessionConfig = (app) => {
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true
    }));
};

const localsConfig = (app) => {
    app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
    });
};

module.exports = {sessionConfig, localsConfig};