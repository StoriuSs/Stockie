const cacheConfig = (app) => {
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Expires', '0');
        res.set('Pragma', 'no-cache');
        next();
    });
};


module.exports = cacheConfig;