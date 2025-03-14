const cacheConfig = (app) => {
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Expires', '0');
        res.set('Pragma', 'no-cache');
        // Nếu không gọi next(), request sẽ bị treo và không tiếp tục đến middleware hoặc route tiếp theo
        next();
    });
};

// Hàm cacheConfig(app) giúp tắt bộ nhớ đệm (cache) trong trình duyệt và proxy, 
// đảm bảo rằng mỗi lần người dùng tải trang sẽ luôn nhận được dữ liệu mới từ server.

module.exports = cacheConfig;