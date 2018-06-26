var request = require('request');
var async = require('async');
require('../config/config')
exports.getMoreMethod = function(req,res,next){
    //res.send('getMore');
    async.waterfall([
        function(callback) {
            var data = {};
            request.get({url:Config.url+"api/test1", formData: {}}, function(err, httpResponse, body) {
                if (err) {
                    console.error('failed:', err);
                    callback && callback(err);
                }else{
                    data.f = JSON.parse(body);
                    callback(null, data);
                }
            });
        },
        function(data, callback) {
            request.get({url:Config.url+"api/test2", formData: {}}, function(err, httpResponse, body) {
                if (err) {
                    console.error('failed:', err);
                    callback && callback(err);
                }else{
                    data.t = JSON.parse(body);
                    callback(null, data);
                }
            });
        },
        function(data, callback) {
            request.get({url:Config.url+"test/pos", formData: {}}, function(err, httpResponse, body) {
                if (err) {
                    console.error('failed:', err);
                    callback && callback(err);
                }else{
                    data.p = JSON.parse(body);
                    callback(null, data);
                }
            });
        }
    ], function(err, result) {
        res.render("getMore", {
            "result": result,
            "first":result.f,
            "two":result.t,
            "three":result.p
        });
    });
}