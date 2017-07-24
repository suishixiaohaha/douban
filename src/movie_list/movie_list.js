(function(angular) {
    //1.创建1个正在热映的模块.
    var app = angular.module("moviecat_movie_list", ["ngRoute", "heima"]);

    //2.配置路由
    app.config(["$routeProvider", function($routeProvider) {
        //                   /in_theaters
        //                   #/in_theaters/3
        //                   #/coming_soon/2
        //                   #/top250/4
        //                   #/details/26270502
        //                   #/search?q=china
        $routeProvider.when("/:type/:page?", {
            templateUrl: "./src/movie_list/movie_list.html",
            controller: "movie_listController"
        });
    }]);

    app.controller("movie_listController", ["$scope", "$routeParams", "$route", "$window", "heimaJsonp", function($scope, $routeParams, $route, $window, heimaJsonp) {

        $scope.isShow = true;

        //每一页的容量
        $scope.pageSize = 10;
        //当前这次要请求第几页的数据.
        $scope.pageIndex = ($routeParams.page || "1") - 0;
        /*
        pageIndex   start
        1           0
        2          10 = (pageIndex-1)*pageSize
        3          20
        4          30
        5          40
        */
        heimaJsonp.jsonp({
            url: "https://api.douban.com/v2/movie/" + $routeParams.type,
            //http://api.douban.com/v2/movie/search?q=china&count=20&strat=0
            params: {
                count: $scope.pageSize, //20
                start: ($scope.pageIndex - 1) * $scope.pageSize, //0
                q: $routeParams.q
                    //http://api.douban.com/v2/movie/in_theaters?count=10&start=10&q=undefine
            },
            callback: function(data) {
                $scope.movies = data;
                console.log(data);
                //总页数.
                $scope.pageCount = $window.Math.ceil((data.total / $scope.pageSize));
                $scope.isShow = false;
                $scope.$apply(); //通知视图数据模型已经发生变化.赶紧刷新视图.
            }
        });

        //请求指定页码的数据.
        $scope.getPage = function(pageIndex) {
            //2  $route.updateParams({ page: pageIndex });
            //先判断页码是否合法.
            //10  1  10  0  5
            //>0 && <= 总页码
            if (pageIndex < 1 || pageIndex > $scope.pageCount) return;

            $route.updateParams({
                page: pageIndex
            });
        };

        /*
        1. 实现分页
           1.1 如何向api发送分页的请求.
               参数1: count 代表希望服务器返回的电影的数量.
               参数2: start 从第几部开始给.
               count=5&start=10

           1.2 页码通过路由参数来传递
               修改路由的匹配规则.
               /in_theaters/:page

               在控制器中就可以拿到page参数.
               就可以根据页码和页容量发起请求.

           1.3 上一页和下一页的切换.
               调用同1个方法 getPage(pageIndex+1)

               我们通过$route服务
               updateParams方法修改路由参数.
               {page:3}




        */


    }]);
})(angular);