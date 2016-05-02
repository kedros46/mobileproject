/**
 * Created by brecht on 12/04/2016.
 */


var app = angular.module("myapp",
    ["ngAnimate", "ngRoute", "ngSanitize", "mobile-angular-ui", "mobile-angular-ui.gestures", "LocalStorageModule"]);

app.config(["$routeProvider", "$locationProvider",

    function($routeProvider){
    $routeProvider.when("/home", {
        templateUrl: "templates/Home.html"
        //, controller: ""
    }).when("/register", {
        templateUrl: "templates/Register.html",
        controller: "registerCtrl"
    }).when("/login", {
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
    }).when("/myMedia", {
        templateUrl: "templates/myMedia.html",
        controller: "mymedia"
    }).when("/newMedia", {
        templateUrl: "templates/NewMedia.html",
        controller: "newmedia"
    }).when("", {
        templateUrl: "templates/"
    })
        .otherwise({redirectTo: "/home"});

}]);