/**
 * Created by brecht on 12/04/2016.
 */


var app = angular.module("myapp", ["ngAnimate", "ngRoute", "ngSanitize", "mobile-angular-ui"]);

//need ngTouch for swipe

app.config(["$routeProvider", "$locationProvider",

    function($routeProvider){
    $routeProvider.when("/home", {
        templateUrl: "templates/Home.html"
        //, controller: ""
    }).when("/register", {
        templateUrl: "templates/Register.html",
        controller: "registerCtrl"
    }).when("/login", {
        templateUrl: "templates/login.html"
    }).when("/myMedia", {
        templateUrl: "templates/myMedia.html"
    }).when("/newMedia", {
        templateUrl: "templates/newMedia"
    }).when("", {
        templateUrl: "templates/"
    })
        .otherwise({redirectTo: "/home"});

}]);