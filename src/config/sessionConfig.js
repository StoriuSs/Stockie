const session = require('express-session');

const sessionConfig = (app) => {
    app.use(session({
        secret: 'd9f8s7d9f8a7sdf9a8s7df98a7sdf8a7sd98f7a98s7df', // Chuỗi bí mật dùng để mã hóa session ID.
        resave: false,  // Không lưu session vào store nếu không có thay đổi.
        saveUninitialized: true  // Tạo session mới cho mỗi request ngay cả khi chưa có dữ liệu.
        // Ở đây không cần next() vì express-session tự gọi next() sau khi xử lý session.
    }));
};

const localsConfig = (app) => {
    app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
    });
};

// sessionConfig(app): Thiết lập session để lưu dữ liệu trên server.
// localsConfig(app): Gán session hiện tại vào res.locals.session, 
// giúp nó có thể truy cập trong tất cả các template (ví dụ: EJS, Pug).
module.exports = {sessionConfig, localsConfig};