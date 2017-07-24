(function(angular) {
    var app = angular.module("heima", []);

    app.service("heimaJsonp", ["$window", function($window) {
        this.jsonp = function(opts) {
            //1 拼接url
            var url = opts.url += "?";
            for (var key in opts.params) {
                url += (key + "=" + opts.params[key] + "&");
            }
            //  生成随机的函数名
            //  Math
            var callbackName = "jsonp_" + $window.Math.random().toString().slice(2);
            $window[callbackName] = opts.callback;
            url += "callback=" + callbackName

            //2.创建script标签.
            var script = $window.document.createElement("script");
            script.src = url;
            $window.document.body.appendChild(script);
        }
    }]);


})(angular);