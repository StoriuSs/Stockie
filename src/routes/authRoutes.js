const express = require('express');
const router = express.Router();
const { loginRequired } = require('../utils/helpers');
const { getLoginPage, 
        postLoginPage, 
        getRegisterPage, 
        postRegisterPage,
        getHomePage,
        getLogout } = require('../controllers/authController');

router.get('/', loginRequired, getHomePage);

router.route('/login')
    .get(getLoginPage)
    .post(postLoginPage);

router.route('/register')
    .get(getRegisterPage)
    .post(postRegisterPage);

router.get('/logout', getLogout);

module.exports = router;