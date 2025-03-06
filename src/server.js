require("dotenv").config();
const express = require('express');
const flash = require('connect-flash');
const configViewEngine = require("./config/viewEngineConfig");
const {sessionConfig, localsConfig} = require("./config/sessionConfig");
const cacheConfig = require("./config/cacheConfig");
const authRouters = require('./routes/authRoutes');
const stockRouters = require('./routes/stockRoutes');

const app = express();

// Config static files and view engine
configViewEngine(app);

// Config session and locals
sessionConfig(app);
localsConfig(app);

// Ensure responses aren't cached
cacheConfig(app);

// Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use flash
app.use(flash());


// Use routes
app.use('/', authRouters);
app.use('/', stockRouters);

const port = process.env.PORT || 8800;
const hostname = process.env.HOSTNAME || 'localhost';
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});