(function(angular) {
    // 创建一个首页模块
    var app = angular.module("moviecat_home", ["ngRoute"]);
    app.config(["$locationProvider", function($locationProvider) {
        $locationProvider.hashPrefix(""); // 配置锚点不用写!
    }]);
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "./src/home/home.html", // 配合hmtl模板路径
        }).when("/", {
            templateUrl: "./src/home/home.html",
        })
    }])

})(angular);