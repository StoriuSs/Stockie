require("dotenv").config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const { apology, loginRequired, lookup, usd } = require('./utils/helpers');
const configViewEngine = require("./config/viewEngine");


const app = express();

// Config static files and view engine
configViewEngine(app);

// Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Custom filter
app.locals.usd = usd;

// Ensure responses aren't cached
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Expires', '0');
    res.set('Pragma', 'no-cache');
    next();
});

// MySQL connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root", // Replace with your MySQL user
    password: "", // Replace with your MySQL password
    database: "finance_db" // Ensure this database is created
});

db.getConnection((err) => {
    if (err) console.error("❌ MySQL connection error:", err.message);
    else console.log("✅ MySQL connected successfully!");
});

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.get('/', loginRequired, (req, res) => {
    res.send(apology("TODO"));
});

app.route('/buy')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

app.get('/history', loginRequired, (req, res) => {
    res.send(apology("TODO"));
});

app.route('/login')
    .get((req, res) => {
        res.render('login', { messages: req.flash('error') });
    })
    .post((req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            req.flash('error', 'must provide username and password');
            return res.redirect('/login');
        }

        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
            if (err) {
                console.error(err);
                req.flash('error', 'Database error');
                return res.redirect('/login');
            }

            if (rows.length !== 1 || !await bcrypt.compare(password, rows[0].hash)) {
                req.flash('error', 'invalid username and/or password');
                return res.redirect('/login');
            }

            req.session.user_id = rows[0].id;
            res.redirect('/');
        });
    });

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.route('/quote')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

app.route('/register')
    .get((req, res) => {
        res.send(apology("TODO"));
    })
    .post((req, res) => {
        res.send(apology("TODO"));
    });

app.route('/sell')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
