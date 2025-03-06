const express = require('express');
const router = express.Router();
const { apology, loginRequired } = require('../utils/helpers');

router.route('/buy')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

router.route('/sell')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

router.route('/quote')
    .get(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    })
    .post(loginRequired, (req, res) => {
        res.send(apology("TODO"));
    });

router.get('/history', loginRequired, (req, res) => {
    res.send(apology("TODO"));
});

module.exports = router;