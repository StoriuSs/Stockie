const connection = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const getLoginPage = (req, res) => {
    // Flash này chỉ có key, không có thông báo nên khi vào trang login lần đầu thì không có thông báo nào
    res.render('login.ejs', { messages: req.flash('error') });
}

const postLoginPage = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        req.flash('error', 'Must provide username and password');
        // Thông báo 'Must provide username and password' được lưu vào key 'error' trong session
        // và sẽ được sử dụng cho request tiếp theo (ở đây là request GET /login)
        return res.redirect('/login');
    }

    
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username])
    try {
        if (rows.length !== 1 || !await bcrypt.compare(password, rows[0].hash)) {
            req.flash('error', 'Invalid username and/or password');
            return res.redirect('/login');
        }
    }
    catch (err) {
        console.error(err);
        req.flash('error', 'Database error');
        return res.redirect('/login');
    }
    
    req.session.user_id = rows[0].id;
    res.redirect('/');
}

const getRegisterPage = (req, res) => {
    res.render('register.ejs', { messages: req.flash('error') });
}

const postRegisterPage = async (req, res) => {
    const { username, password, confirmation } = req.body;
    if (!username || !password || !confirmation) {
        req.flash('error', 'Must provide username and password and confirmation');
        return res.redirect('/register');
    }

    const [listUsers] = await connection.query("SELECT username FROM users");
    if (listUsers.some(user => user.username === username)) {
        req.flash('error', 'Username already exists');
        return res.redirect('/register');
    }

    if (password != confirmation) {
        req.flash('error', 'Confirmation does not match password');
        return res.redirect('/register');
    }
    
    try {
        await connection.query("INSERT INTO users (username, hash) VALUES (?, ?)", 
        [username, bcrypt.hashSync(password, 10)])
    }
    catch (err) {
        console.error(err);
        req.flash('error', 'Database error');
        return res.redirect('/register');
    }

    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username])
    req.session.user_id = rows[0].id;
    return res.redirect('/');
}

module.exports = { getLoginPage, postLoginPage, getRegisterPage, postRegisterPage };