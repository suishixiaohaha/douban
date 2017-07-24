(function(angular) {
    // 依赖模块
    var app = angular.module("moviecat_details", ["ngRoute", "heima"]);
    //配置路由
    //配置路由，需要$routeProvider的方法，
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/details/:id", {
            templateUrl: "./src/details/details.html",
            controller: "detailsController"
        });
    }]);
    console.log(123)
    app.controller("detailsController", ["$scope", "$routeParams", "heimaJsonp", function($scope, $routeParams, heimaJsonp) {
        $scope.SHOW = true;
        var id = $routeParams.id;
        console.log(id)
        heimaJsonp.jsonp({
            url: "http://api.douban.com/v2/movie/subject/" + id,
            params: {},
            callback: function(data) {
                $scope.SHOW = false;
                // console.log(data);
                $scope.movie = data;
                $scope.$apply();
            }
        })

    }])

})(angular);