(function(angular) {
    var app = angular.module("moviecat_in_theaters", ["ngRoute", "heima"]);

    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/in_theaters/:page/:form", {
            templateUrl: "./src/in_theaters/in_theaters.html",
            controller: "in_theatersController"
        }).when("/coming_soon/:page/:form", {
            templateUrl: "./src/in_theaters/in_theaters.html",
            controller: "in_theatersController"
        }).when("/top250/:page/:form", {
            templateUrl: "./src/in_theaters/in_theaters.html",
            controller: "in_theatersController"
        }).when("/search/:page/:form/:shuzu", {
            templateUrl: "./src/in_theaters/in_theaters.html",
            controller: "in_theatersController"
        });
    }]);
    app.controller("in_theatersController", ["$scope", "$routeParams", "$route", "$window", "heimaJsonp", "$rootScope", function($scope, $routeParams, $route, $window, heimaJsonp, $rootScope) {
        // console.log($routeParams)


        // 判断路由是哪一个。不同的给不同的请求地址，其他都一样
        if ($routeParams.form == "zhengzai") {
            $scope.url = "http://api.douban.com/v2/movie/in_theaters";
            // console.log("正在热映")
        } else if ($routeParams.form == "jijiang") {
            $scope.url = "http://api.douban.com/v2/movie/coming_soon";
            // console.log("即将热映")
        } else if ($routeParams.form == "Top250") {
            $scope.url = "http://api.douban.com/v2/movie/top250";
            // console.log("Top250")
        } else if ($routeParams.form == "search") {
            console.log($routeParams.shuzu)
            $scope.url = "http://api.douban.com/v2/movie/search?" + $routeParams.shuzu;

        }

        $scope.pageSize = 10; // 每次点击后给10条数据
        $scope.pageIndex = ($routeParams.page || "1") - 0;

        // 第一页的时候上一页的按钮为灰色
        if ($scope.pageIndex == 1) {
            angular.element(document.querySelector('.prev')).addClass("disable")
        } else {
            angular.element(document.querySelector('.prev')).removeClass("disable");
        }



        $scope.SHOW = true; // loading动画显示
        // console.log($scope.pageIndex)
        /*
        每个页面对应的请求电影顺序，第一次请求请求10前面十个，后面请求依次类推
        pageIndex    start
        1             0-9
        2             10-19
        3             20-29
        4             30-39
        */
        heimaJsonp.jsonp({
            url: $scope.url,
            params: {
                count: $scope.pageSize, //每次请求多少个电影
                // // 每次从第1开始加载，电影数据
                start: ($scope.pageIndex - 1) * $scope.pageSize, //每次从那个位置开始请求
            },
            callback: function(data) {
                $scope.SHOW = false; // loading动画隐藏
                console.log($scope.url)
                    // console.log(data);
                $scope.movies = data;
                //                              //电影的总个数除以每次需要多少个数据，得到总页数
                $scope.pageCount = $window.Math.ceil((data.total / $scope.pageSize));

                $scope.$apply(); // angular自定义服务并不会自动刷新DOM树

                // 第最后页的时候下一页的按钮为灰色
                if ($scope.pageIndex == $scope.pageCount) {
                    angular.element(document.querySelector('.next')).addClass("disable")
                } else {
                    angular.element(document.querySelector('.next')).removeClass("disable");
                }

            }
        });

        // 上一页下一个点击事件
        $scope.getPage = function(pageIndex) {
            //点击之后先运算pageIndex大于总页数或小于零就不去改变路由值，
            if (pageIndex < 1 || pageIndex > $scope.pageCount) return;

            // 内置方法可以改变路由值
            $route.updateParams({
                page: pageIndex, // 把路由值改变，之后会重新匹配数据，重新加载
            })
        }



    }]);



})(angular);