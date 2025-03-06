const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { loginRequired } = require('../utils/helpers');
const connection = require('../config/dbConfig');


router.get('/', loginRequired, (req, res) => {
    res.send("TODO");
});

router.route('/login')
    .get((req, res) => {
        // Flash này chỉ có key, không có thông báo nên khi vào trang login lần đầu thì không có thông báo nào
        res.render('login.ejs', { messages: req.flash('error') });
    })
    .post((req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            req.flash('error', 'Must provide username and password');
            // Thông báo 'Must provide username and password' được lưu vào key 'error' trong session
            // và sẽ được sử dụng cho request tiếp theo (ở đây là request GET /login)
            return res.redirect('/login');
        }

        connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
            if (err) {
                console.error(err);
                req.flash('error', 'Database error');
                return res.redirect('/login');
            }

            if (rows.length !== 1 || !await bcrypt.compare(password, rows[0].hash)) {
                req.flash('error', 'Invalid username and/or password');
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
        res.render('register.ejs', { messages: req.flash('error') });
    })
    .post((req, res) => {
        res.send("TODO");
    });

module.exports = router;