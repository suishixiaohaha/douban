(function(angular) {
    var app = angular.module("moviecat", ["moviecat_home", "moviecat_in_theaters", "moviecat_details"]);

    app.directive("heimaActive", function() { // 自定义一个heimaActive指令，在html要写成heima-active
        return {
            restrict: "AE", // 可以当做标签和自定义属性写
            link: function(scope, element, attrs) {
                element.on("click", function() {
                    // 找到这个标签的父元素下面的子元素全都移除active类名
                    element.parent().children().removeClass("active");
                    // 给自生添加类名
                    element.addClass("active");
                    // console.log(scope) // 忽略
                    // console.log(element) // 代表正在解析的这个dom元素.
                    // console.log(attrs) //  正在解析的这个dom元素的所有的属性.
                });
            }
        };
    });



    app.run(['$rootScope', "$location", function($rootScope, $location) {

        $rootScope.query = function() {
            // 获取到要搜索的内容,用双向绑定的值
            // console.log($rootScope.search)
            $location.path('/search/1/search/q=' + $rootScope.search);
            // 搜索后变为空
            // $rootScope.search = "";
        };
    }]);



})(angular);