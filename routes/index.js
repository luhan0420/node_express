//获取token
var getMoreMethod = require('../method_routes/getMore-method').getMoreMethod;
module.exports = function(app, domain) {
    //domain来处理异常
    app.use(function(req, res, next) {
        var d = domain.create();
        //监听domain的错误事件
        d.on('error', function(err) {
            // res.statusCode = 500;
            res.statusCode = 404;
            res.render('htmlerror');
            d.dispose();
        });
        d.add(req);
        d.add(res);
        d.run(next);
    });
    //模板辅助方法
    //app.use(require('../ejs-fun/main'));
    app.get('/index',getMoreMethod);
}
