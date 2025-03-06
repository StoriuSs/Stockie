const express = require('express');
const router = express.Router();
const { apology, loginRequired } = require('../utils/helpers');

router.route('/buy')
    .get(loginRequired, (req, res) => {
        res.send("TODO");
    })
    .post(loginRequired, (req, res) => {
        res.send("TODO");
    });

router.route('/sell')
    .get(loginRequired, (req, res) => {
        res.send("TODO");
    })
    .post(loginRequired, (req, res) => {
        res.send("TODO");
    });

router.route('/quote')
    .get(loginRequired, (req, res) => {
        res.send("TODO");
    })
    .post(loginRequired, (req, res) => {
        res.send("TODO");
    });

router.get('/history', loginRequired, (req, res) => {
    res.send("TODO");
});

module.exports = router;