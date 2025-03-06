const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { apology, loginRequired } = require('../utils/helpers');
const connection = require('../config/dbConfig');


router.get('/', loginRequired, (req, res) => {
    res.send(apology("TODO"));
});

router.route('/login')
    .get((req, res) => {
        res.render('login', { messages: req.flash('error') });
    })
    .post((req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            req.flash('error', 'must provide username and password');
            return res.redirect('/login');
        }

        connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
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

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.route('/register')
    .get((req, res) => {
        res.send(apology("TODO"));
    })
    .post((req, res) => {
        res.send(apology("TODO"));
    });

module.exports = router;