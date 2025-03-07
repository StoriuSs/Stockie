const express = require('express');
const router = express.Router();
const { loginRequired } = require('../utils/helpers');
const { getLoginPage, 
        postLoginPage, 
        getRegisterPage, 
        postRegisterPage } = require('../controllers/authController');

router.get('/', loginRequired, (req, res) => {
    res.send("TODO");
});

router.route('/login')
    .get(getLoginPage)
    .post(postLoginPage);

router.route('/register')
    .get(getRegisterPage)
    .post(postRegisterPage);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



module.exports = router;